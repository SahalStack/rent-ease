import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { authorize } from "../utils/authorize.js";
import { upload } from "../middleware/upload.js";

import {
	createProduct,
	getProducts,
	getProductById,
	updateProduct,
	// deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

//for user 
router.get("/", getProducts);
router.get("/:id", getProductById);

router.use(verifyToken, authorize("admin"));

//done by admin
router.post("/", upload.fields([
	{ name: "image", maxCount: 1 },
	{ name: "extraImages", maxCount: 4 },
]), createProduct);
router.put("/:id", updateProduct);
// router.delete("/:id", verifyToken, deleteProduct);

export default router;
