import express from "express";
import { getAllOrders } from "../controllers/adminOrderController.js";
import verifyToken from "../middleware/verifyToken.js";
import { authorize } from "../utils/authorize.js";

const adminOrderRouter = express.Router();

// Admin listing is separate from the customer scoped /api/orders routes.
adminOrderRouter.use(verifyToken, authorize("admin"));

adminOrderRouter.get("/", getAllOrders);

export default adminOrderRouter;
