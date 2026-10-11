import Product from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import User from "../models/userModel.js";

const createReview = async (req, res) => {
	try {
		const { productId } = req.params;
		const { rating, comment } = req.body;

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		const user = await User.findById(req.user.id);

		const review = await Review.create({
			product: productId,
			user: user._id,
			userName: user.full_name,
			country: user.address?.state,
			rating,
			comment,
		});

		product.reviews.push(review._id);
		await product.save();

		res.status(201).json({
			success: true,
			message: 'Review Added!',
			review,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const deleteReview = async (req, res) => {
	try {
		const { reviewId } = req.params;
		const review = await Review.findById(reviewId);

		if (!review) {
			return res.status(404).json({
				success: false,
				message: "Review not found",
			});
		}

		// Optional: Only review owner can delete
		if (review.user.toString() !== req.user.id) {
			return res.status(403).json({
				success: false,
				message: "Not authorized",
			});
		}

		await Product.findByIdAndUpdate(review.product, {
			$pull: { reviews: review._id },
		});

		await Review.findByIdAndDelete(reviewId);

		res.status(200).json({
			success: true,
			message: "Review deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export { createReview }