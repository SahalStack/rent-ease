import Stripe from "stripe";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createCheckoutSession = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const { items, phone, address, notes } = req.body;

        console.log("Received items from frontend:", items);

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const lineItems = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    description: `Duration: ${item.duration?.value ?? item.duration} month(s)`,
                },
                unit_amount: Math.round(
                    item.price *
                    (item.duration?.value ?? item.duration) *
                    100
                )
            },
            quantity: item.quantity,
        }));

        const totalSecurityDeposit = items.reduce(
            (sum, item) => sum + item.securityDeposit * item.quantity, 0
        );

        if (totalSecurityDeposit > 0) {
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: { name: "Security Deposit (Refundable)" },
                    unit_amount: totalSecurityDeposit * 100,
                },
                quantity: 1,
            });
        }

        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: { name: "Delivery Fee" },
                unit_amount: 49 * 100,
            },
            quantity: 1,
        });

        const minimalItems = items.map(item => ({
            id: item.id,
            qty: item.quantity,
            dur: item.duration?.value ?? item.duration,
            deliveryStartDate: item.deliveryStartDate,
            rentalEndDate: item.rentalEndDate,
        }));

        console.log("Minimal Items:", minimalItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/checkout`,
            metadata: {
                type: "new_rental",
                userId: req.user.id.toString(),
                phone: phone || "",
                address: address || "",
                notes: notes || "",
                items: JSON.stringify(minimalItems),
            },
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error("Stripe error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const verifyCheckoutSession = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    try {
        const { session_id } = req.query;
        console.log("Session ID received:", session_id);

        const session = await stripe.checkout.sessions.retrieve(session_id);

        if (session.payment_status !== "paid") {
            return res.status(400).json({ message: "Payment not completed" });
        }

        const { userId, phone, address, notes, items: rawItems } = session.metadata;
        const items = JSON.parse(rawItems);
        console.log("Items from Stripe Metadata:", items);

        // Check if order already exists (prevent duplicates)
        const existing = await Order.findOne({ stripeSessionId: session.id });
        if (existing) {
            return res.status(200).json({ order: existing });
        }

        // Build order items
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.id);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.id}`,
                });
            }

            const quantity = item.qty;
            const duration = item.dur;

            orderItems.push({
                productId: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity,
                duration,
                deliveryStartDate: item.deliveryStartDate,
                rentalEndDate: item.rentalEndDate,
                securityDeposit: product.securityDeposit,
                itemTotal: product.price * quantity * duration,
            });
        }

        const subtotal = orderItems.reduce(
            (sum, item) => sum + item.itemTotal,
            0);
        const totalSecurityDeposit = orderItems.reduce(
            (sum, item) => sum + item.securityDeposit * item.quantity,
            0
        );
        const deliveryFee = 49;
        const totalAmount = subtotal + totalSecurityDeposit + deliveryFee;

        const order = await Order.create({
            user: userId,
            items: orderItems,
            phone,
            address,
            notes,
            subtotal,
            totalSecurityDeposit,
            deliveryFee,
            totalAmount,
            stripeSessionId: session.id,
            paymentStatus: "paid",
            orderStatus: "pending",
        });

        res.status(201).json({ order });
    } catch (error) {
        console.error("Verify session error:", error.message);
        res.status(500).json({ message: error.message });
    }
};