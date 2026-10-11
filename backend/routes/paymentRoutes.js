import express from "express";
import { createCheckoutSession,verifyCheckoutSession } from "../controllers/paymentController.js";
import verifyToken from "../middleware/verifyToken.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", verifyToken, createCheckoutSession);
paymentRouter.get("/verify-session", verifyToken, verifyCheckoutSession);

export default paymentRouter;