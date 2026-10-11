import express from "express";
import { getDashboardSummary, getAllUsers, updateUser, deleteUser } from "../controllers/dashboardController.js";
import { authorize } from "../utils/authorize.js";
import verifyToken from "../middleware/verifyToken.js";

const dashboardRouter = express.Router();

dashboardRouter.use(verifyToken, authorize("admin"));

dashboardRouter.get("/summary", getDashboardSummary);
dashboardRouter.get("/users", getAllUsers);
dashboardRouter.patch("/users/:id", updateUser);
dashboardRouter.delete("/users/:id", deleteUser);

export default dashboardRouter;