import { buildProductFilter } from "../utils/productQuery.js";
import { applyProductSort } from "../utils/productSort.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js"

import AppError from "../utils/appError.js";
import asyncHandler from '../utils/asyncHandler.js'
import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";

const getProducts = asyncHandler(async (req, res) => {

	const filter = buildProductFilter(req.query);

	let query = Product.find(filter);
	query = applyProductSort(query, req.query.sort);

	const products = await query;
	res.status(200).json({
		success: true,
		message: 'Products fetched successfully',
		TotalProducts: products.length,
		products,
	});
});

const getProductById = asyncHandler(async (req, res) => {

	const product = await Product.findById(req.params.id)
		.populate("reviews");
	if (!product) throw new AppError("Product not found", 404);

	const ratingData = await Review.aggregate([
		{ $match: { product: product._id } },
		{
			$group: {
				_id: null,
				avgRating: { $avg: "$rating" },
				reviewCount: { $sum: 1 },
			},
		},
	]);

	const avgRating = ratingData[0]?.avgRating?.toFixed(1) || "0.0";
	const reviewCount = ratingData[0]?.reviewCount || 0;

	res.status(200).json({
		success: true,
		message: 'Product fetched',
		product: {
			...product.toJSON(),
			avgRating,
			reviewCount,
		},
	});

});

const createProduct = asyncHandler(async (req, res) => {

	const { name, description, category, price, securityDeposit, inStock } = req.body;
	if (!req.files.image) throw new AppError("Main image required", 400);

	const mainImage = await uploadToCloudinary(req.files.image[0].buffer);

	const extraImages = req.files.extraImages
		? await Promise.all(
			req.files.extraImages.map((file) => uploadToCloudinary(file.buffer))
		)
		: [];

	const product = await Product.create({
		name,
		description,
		category,
		price: Number(price),
		securityDeposit: Number(securityDeposit),
		image: mainImage,
		extraImages,
		inStock,
	});

	res.status(201).json({
		success: true,
		message: "Product Added Successfully",
		product,
	});

});

const updateProduct = asyncHandler(async (req, res) => {

	const product = await Product.findById(req.params.id);
	if (!product) throw new AppError("Product not found", 404);

	const updatedProduct = await Product.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			returnDocument: "after",
			runValidators: true,
		}
	);

	res.status(200).json({
		success: true,
		message: "Product updated successfully",
		product: updatedProduct,
	});

});

export { getProducts, getProductById, createProduct, updateProduct }