import express from "express";
import {
	getUserOrders,
	getOrderById,
	createOrder,
	cancelOrder,
} from "../controllers/orderController.js";
import verifyToken from "../middleware/verifyToken.js";

const orderRouter = express.Router();

// orderRouter.use(verifyToken);

orderRouter.get("/", getUserOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.patch("/:id", cancelOrder);

export default orderRouter;