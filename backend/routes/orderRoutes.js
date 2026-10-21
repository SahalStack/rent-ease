import express from "express";
import {
	getUserOrders,
	getOrderById,
	createOrder,
	cancelOrder,
} from "../controllers/orderController.js";
import verifyToken from "../middleware/verifyToken.js";

const orderRouter = express.Router();

// Every order route acts on behalf of the signed-in customer.
orderRouter.use(verifyToken);

orderRouter.get("/", getUserOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", createOrder);
orderRouter.delete("/:id", cancelOrder);

export default orderRouter;
