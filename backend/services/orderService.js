import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import AppError from "../utils/appError.js";

const USER_FIELDS = "full_name email phone address";

// Mongoose throws a CastError (500) for a malformed id, so ids are checked up front.
export const assertValidOrderId = (orderId) => {
	if (!mongoose.isValidObjectId(orderId)) {
		throw new AppError("Invalid order id", 400);
	}
};

export const listOrdersForUser = (userId) =>
	Order.find({ user: userId })
		.populate("user", USER_FIELDS)
		.sort({ createdAt: -1 });

export const listAllOrders = () =>
	Order.find().populate("user", USER_FIELDS).sort({ createdAt: -1 });

// Scoping the lookup by owner keeps other customers' orders unreachable.
export const getOrderForUser = async (orderId, userId) => {
	const order = await Order.findOne({ _id: orderId, user: userId }).populate(
		"user",
		USER_FIELDS
	);

	if (!order) {
		throw new AppError("Order not found", 404);
	}

	return order;
};

export const createOrderForUser = async (userId, orderData) => {
	return Order.create({ ...orderData, user: userId });
};

// Only pending orders can be cancelled, the rule is shared with the tests.
export const assertCancellable = (order) => {
	if (!order) {
		throw new AppError("Order not found", 404);
	}

	if (order.orderStatus !== "pending") {
		throw new AppError("Only pending orders can be cancelled", 400);
	}
};

export const cancelOrderForUser = async (orderId, userId) => {
	const order = await Order.findOne({ _id: orderId, user: userId });

	assertCancellable(order);

	order.orderStatus = "cancelled";
	await order.save();

	return order.populate("user", USER_FIELDS);
};
