import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import {
	assertValidOrderId,
	cancelOrderForUser,
	createOrderForUser,
	getOrderForUser,
	listOrdersForUser,
} from "../services/orderService.js";

const REQUIRED_ORDER_FIELDS = [
	"items",
	"phone",
	"address",
	"subtotal",
	"totalSecurityDeposit",
	"deliveryFee",
	"totalAmount",
];

const assertValidOrderPayload = (payload) => {
	const missingFields = REQUIRED_ORDER_FIELDS.filter(
		(field) => payload[field] === undefined || payload[field] === null
	);

	if (missingFields.length > 0) {
		throw new AppError(`Missing required fields: ${missingFields.join(", ")}`, 400);
	}

	if (!Array.isArray(payload.items) || payload.items.length === 0) {
		throw new AppError("Order must contain at least one item", 400);
	}
};

const getUserOrders = asyncHandler(async (req, res) => {
	const orders = await listOrdersForUser(req.user.id);

	res.status(200).json({
		success: true,
		count: orders.length,
		orders,
	});
});

const getOrderById = asyncHandler(async (req, res) => {
	assertValidOrderId(req.params.id);

	const order = await getOrderForUser(req.params.id, req.user.id);

	res.status(200).json({
		success: true,
		message: "Order fetched successfully",
		order,
	});
});

const createOrder = asyncHandler(async (req, res) => {
	assertValidOrderPayload(req.body);

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

	const order = await createOrderForUser(req.user.id, {
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
		message: "Order created successfully",
		order,
	});
});

const cancelOrder = asyncHandler(async (req, res) => {
	assertValidOrderId(req.params.id);

	const order = await cancelOrderForUser(req.params.id, req.user.id);

	res.status(200).json({
		success: true,
		message: "Order cancelled successfully",
		order,
	});
});

export { getUserOrders, getOrderById, createOrder, cancelOrder };
