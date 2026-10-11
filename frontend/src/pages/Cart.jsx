/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity, applyPromo, removePromo } from "../features/Cart/cartSlice";
import CartItem from "../features/Cart/CartItem";
import EmptyCart from "../features/Cart/EmptyCart";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";
import { selectCartTotals } from "../features/Cart/cartSelectors";
import DeliveryInfoCard from "../features/Product/DeliveryInfoCard";
import { formatDate } from "../utils/helpers";
import { handleDelivery } from "../utils/deliveryUtils";

const Cart = () => {
	const [promoInput, setPromoInput] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		rentalSubtotal,
		depositTotal,
		deliveryFee,
		discountAmount,
		grandTotal,
	} = useSelector(selectCartTotals);

	usePageTitle("Shopping Cart");

	const cartItems = useSelector(state => state.cart.items);
	console.log(cartItems)

	const { isAuthenticated } = useSelector((state) => state.auth);
	const { promoApplied, discount, promoError, promoCode } = useSelector(state => state.cart);

	if (cartItems.length === 0) {
		return <EmptyCart />;
	}

	const handleCheckout = () => {
		navigate("/checkout");
	};

	return (
		<main
			className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-section-padding min-h-screen animate-fadeUp">
			<h1 className="font-display-lg text-headline-md md:text-display-lg sm:text-display-lg text-on-surface mb-12">Shopping Cart</h1>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
				<div className="lg:col-span-8 space-y-gutter">

					{cartItems.map((item) => (
						<CartItem key={item.id} item={item} />
					))}

					<div className="pt-8">
						<Link to='/products' className="inline-flex items-center text-primary font-label-md text-label-md hover:translate-x-1 transition-transform group"
						>
							<span className="material-symbols-outlined mr-2">arrow_back</span>
							Continue Shopping
						</Link>
					</div>
				</div>

				{/*Order Summary Section */}

				{/* <DeliveryInfoCard
					deliveryStart={formatDate(deliveryStartDate)}
					deliveryEnd={formatDate(deliveryEndDate)}
					rentalEnd={`${formatDate(rentalEndDate)} – ${formatDate(rentalEndDateMax)}`}
				/> */}

				<div className="lg:col-span-4 sticky top-28">
					<div
						className="bg-surface-container-lowest p-8 rounded-xl shadow-ambient-sm border border-outline-variant/20">
						<h2 className="font-headline-md text-headline-md text-on-surface mb-8">Order Summary</h2>
						<div className="space-y-4 mb-8">
							<div className="flex justify-between items-center text-on-surface-variant">
								<span className="font-body-md text-body-md">Monthly Subtotal</span>
								<span className="font-body-md text-body-md text-on-surface">${rentalSubtotal}.00</span>
							</div>
							<div className="flex justify-between items-center text-on-surface-variant">
								<span className="font-body-md text-body-md">Security Deposit</span>
								<span className="font-body-md text-body-md text-on-surface">${depositTotal}.00</span>
							</div>
							<div className="flex justify-between items-center text-on-surface-variant">
								<span className="font-body-md text-body-md">Delivery Fee</span>
								<span className="font-body-md text-body-md text-on-surface">${deliveryFee}.00</span>
							</div>
							<div className="h-px bg-outline-variant/30 my-6"></div>
							<div className="flex justify-between items-end">
								<span className="font-headline-sm text-headline-sm text-on-surface">Total Due Now</span>
								<div className="text-right">
									<span className="font-headline-md text-headline-md text-primary font-bold">${Math.round(grandTotal)}.00</span>
									<p className="font-caption text-caption text-on-surface-variant block mt-1">Includes first
										month's rent</p>
								</div>
							</div>
						</div>
						<div className="space-y-4">
							<button
								onClick={handleCheckout}
								className="w-full py-4 bg-primary text-white font-bold text-body-lg rounded-lg shadow-sm hover:shadow-ambient-lg transition-all active:scale-[0.98]">
								Proceed to Checkout
							</button>
							<div className="flex items-center justify-center gap-2 text-on-surface-variant pt-4">
								<span className="material-symbols-outlined text-sm"
									style={{ fontVariationSettings: "'FILL' 1" }}
								>lock</span>
								<span className="font-caption text-caption">Secure Encrypted Checkout</span>
							</div>
						</div>

						<div className="mt-8 p-4 bg-surface-container-low rounded-lg border border-dashed border-outline">
							<p className="font-label-md text-label-md text-primary mb-2">Have a promo code?</p>

							{promoApplied ? (
								<div className="flex items-center justify-between">
									<span className="text-label-md text-primary font-bold">
										🎉 "{promoCode}" — {discount}% off applied!
									</span>
									<button
										className="text-error text-label-md font-label-md"
										onClick={() => dispatch(removePromo())}
									>
										Remove
									</button>
								</div>
							) : (
								<div className="flex flex-col gap-2">
									<div className="flex gap-2">
										<input
											className="grow bg-white border border-outline-variant/50 rounded-lg px-3 py-2 text-label-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
											placeholder="Enter code"
											type="text"
											value={promoInput}
											onChange={(e) => setPromoInput(e.target.value)}
										/>
										<button
											className="bg-primary-fixed text-on-primary-fixed-variant px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-white transition-colors"
											onClick={() => dispatch(applyPromo(promoInput))}
										>
											Apply
										</button>
									</div>
									{promoError && (
										<p className="text-caption font-caption text-error">{promoError}</p>
									)}
								</div>
							)}
						</div>
					</div>

					<div className="mt-6 flex flex-col gap-4 px-4">
						<div className="flex items-center gap-3">
							<span className="material-symbols-outlined text-secondary">verified_user</span>
							<p className="font-caption text-caption text-on-surface-variant">Quality guarantee on all rented
								items.</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="material-symbols-outlined text-secondary">support_agent</span>
							<p className="font-caption text-caption text-on-surface-variant">24/7 Support for all maintenance
								needs.</p>
						</div>
					</div>

				</div>

			</div>
		</main>
	)
}

export default Cart
