import asyncHandler from "../utils/asyncHandler.js";
import { listAllOrders } from "../services/orderService.js";

const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await listAllOrders();

	res.status(200).json({
		success: true,
		count: orders.length,
		orders,
	});
});

export { getAllOrders };
