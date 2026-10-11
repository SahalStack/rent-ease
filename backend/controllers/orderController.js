import Order from "../models/orderModel.js";

const getUserOrders = async (req, res, next) => {
	try {
		const orders = await Order.find(
			// {user: req.user.id,}
		).populate("user", "full_name email")
			.sort({ createdAt: -1 })

		res.status(200).json({
			success: true,
			count: orders.length,
			orders,
		});
	} catch (error) {
		next(error);
	}
};

const getOrderById = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id)
			.populate("user", "full_name email phone address");

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found",
			});
		}
		res.status(200).json({
			success: true,
			message: 'order fetched succesfully',
			order,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const createOrder = async (req, res) => {
	try {
		const {
			items,
			phone,
			address,
			notes,
			subtotal,
			totalSecurityDeposit,
			deliveryFee,
			totalAmount,
			stripeSessionId,
			startDate,
			endDate,
		} = req.body;

		const order = await Order.create({
			user: req.user.id,
			items,
			phone,
			address,
			notes,
			subtotal,
			totalSecurityDeposit,
			deliveryFee,
			totalAmount,
			stripeSessionId,
			paymentStatus: "paid",
			startDate,
			endDate,
			orderStatus: "pending",
		});

		res.status(201).json({
			success: true,
			message: 'Order created Successfully',
			order,
		});
	} catch (error) {
		console.error("Create Order Error:", error);

		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const cancelOrder = async (req, res) => {
	try {
		const order = await Order.findById(req.params.id);

		if (!order) {
			return res.status(404).json({ message: "Order not found" });
		}

		if (order.user.toString() !== req.user.id) {
			return res.status(403).json({ message: "Not authorized" });
		}

		if (order.orderStatus !== "pending") {
			return res.status(400).json({ message: "Only pending orders can be cancelled" });
		}

		order.orderStatus = "cancelled";
		await order.save();

		res.status(200).json({
			success: true,
			message: "Order cancelled successfully",
			order,
		});

	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export {
	getUserOrders, getOrderById, createOrder, cancelOrder
}
