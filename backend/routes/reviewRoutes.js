import express from "express";
import { createReview, deleteReview } from "../controllers/reviewController.js";
import verifyToken from "../middleware/verifyToken.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productId", verifyToken, createReview);
reviewRouter.delete("/:reviewId", verifyToken, deleteReview);

export default reviewRouter;