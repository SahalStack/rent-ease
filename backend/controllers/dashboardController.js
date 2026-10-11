import AppError from "../utils/appError.js";
import asyncHandler from '../utils/asyncHandler.js'

import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

const getDashboardSummary = asyncHandler(async (req, res) => {

	const now = new Date();
	const [
		totalUsers,
		totalProducts,
		totalOrders,
		activeRentals,
		pendingOrders,
		pendingReturns,
		outOfStockProducts,
		revenueResult,
	] = await Promise.all([
		User.estimatedDocumentCount(),
		Product.estimatedDocumentCount(),
		Order.estimatedDocumentCount(),
		Order.countDocuments({ orderStatus: "active" }),
		Order.countDocuments({ orderStatus: "pending" }),
		Order.countDocuments({
			orderStatus: "active",
			"items.rentalEndDate": { $lte: now },
		}),
		Product.countDocuments({ inStock: false }),
		Order.aggregate([
			{ $match: { paymentStatus: "paid" } },
			{ $group: { _id: null, total: { $sum: "$totalAmount" } } },
		]),
	]);

	res.status(200).json({
		totalUsers,
		totalProducts,
		totalOrders,
		activeRentals,
		pendingOrders,
		pendingReturns,
		outOfStockProducts,
		totalRevenue: revenueResult[0]?.total || 0,
	});

});

const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password -refreshToken");
	return res.status(200).json({
		success: true,
		message: "User fetched successfully",
		users
	});
});

const updateUser = asyncHandler(async (req, res) => {

	const { id } = req.params;
	const { status } = req.body;

	const user = await User.findByIdAndUpdate(
		id,
		{ status },
		{ new: true }
	);

	if (!user) return AppError("User not found", 404);
	res.status(200).json({ message: "User Status updated", user });

});

const deleteUser = asyncHandler(async (req, res) => {

	const { userId } = req.params;
	console.log("userId:", userId);

	// if (req.user._id.toString() === userId) {
	// 	return res.status(400).json({
	// 		success: false,
	// 		message: "You cannot delete your own account",
	// 	});
	// }

	const user = await User.findByIdAndDelete(userId);
	if (!user) AppError("User not found", 404);

	return res.status(200).json({
		success: true,
		message: "User deleted successfully",
	});


})

export { getDashboardSummary, getAllUsers, updateUser, deleteUser };

