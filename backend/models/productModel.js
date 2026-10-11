import mongoose from 'mongoose';
import Review from './reviewModel.js';

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		category: {
			type: String,
			required: true,
			enum: [
				"furniture",
				"bedroom",
				"dining",
				"office",
				"appliances",
				"electronics",
			],
		},
		price: {
			type: Number,
			required: true
		},
		securityDeposit: {
			type: Number,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		image: {
			type: String,
			required: true
		},
		extraImages: [String],
		// features: [featureSchema],
		// specifications: specificationSchema,
		reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
		inStock: {
			type: Boolean,
			default: true
		},
	},
	{ timestamps: true }
);

productSchema.virtual("reviewCount").get(function () {
	return this.reviews.length;
});

productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
