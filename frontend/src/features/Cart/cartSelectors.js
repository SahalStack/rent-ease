import { createSelector } from "@reduxjs/toolkit";

export const selectCartTotals = createSelector(
	(state) => state.cart.items,
	(state) => state.cart.discount,
	(state) => state.cart.promoApplied,
	(items, discount, promoApplied) => {
		const rentalSubtotal = items.reduce(
			(total, item) => total + item.price * item.quantity * item.duration, 0
		);

		const depositTotal = items.reduce(
			(total, item) => total + item.securityDeposit * item.quantity, 0
		);

		const deliveryFee = 49;

		const discountAmount = promoApplied
			? (rentalSubtotal * discount) / 100
			: 0;

		const grandTotal = rentalSubtotal + depositTotal + deliveryFee - discountAmount;

		return {
			rentalSubtotal,
			depositTotal,
			deliveryFee,
			discountAmount,
			grandTotal,
		};
	}
);