import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
		items: [
			{
				productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
				name: { type: String, required: true },
				image: { type: String },
				price: { type: Number, required: true },
				quantity: { type: Number, required: true },
				duration: { type: Number, required: true },
				securityDeposit: { type: Number, required: true },
				itemTotal: { type: Number, required: true },
				deliveryStartDate: {
					type: Date,
					required: true,
				},

				rentalEndDate: {
					type: Date,
					required: true,
				},
			},
		],

		//Delivery Info
		phone: { type: String, required: true },
		address: { type: String, required: true },
		notes: { type: String, default: "" },

		//Pricing
		subtotal: { type: Number, required: true },
		totalSecurityDeposit: { type: Number, required: true },
		deliveryFee: { type: Number, required: true },
		totalAmount: { type: Number, required: true },

		//Stripe
		stripeSessionId: { type: String },
		paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },

		//Status
		orderStatus: { type: String, enum: ["pending", "active", "completed", "cancelled"], default: "pending" },

		// Rental Extension History
		extensions: [
			{
				months: {
					type: Number,
					required: true,
				},

				previousEndDate: {
					type: Date,
					required: true,
				},

				newEndDate: {
					type: Date,
					required: true,
				},

				amount: {
					type: Number,
					required: true,
				},

				stripeSessionId: {
					type: String,
				},

				extendedAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

orderSchema.virtual("totalItems").get(function () {
	return this.items.reduce((sum, item) => sum + item.quantity, 0);
});

orderSchema.set("toJSON", { virtuals: true });

const Order = mongoose.model("Order", orderSchema);

export default Order