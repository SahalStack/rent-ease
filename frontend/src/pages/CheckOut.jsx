import usePageTitle from "../hooks/usePageTitle";
import CheckOutItemCard from "../features/CheckOut/CheckOutItemCard";
import useCheckout from "../hooks/useCheckOut";

const CheckOut = () => {
	usePageTitle("Checkout");

	const {
		cartItems,
		formData,
		subtotal,
		totalSecurityDeposit,
		deliveryFee,
		totalAmount,
		isLoading,
		error,
		validationError,
		handleChange,
		handlePayment,
	} = useCheckout();

	return (
		<main className="max-w-2xl mx-auto px-4 md:px-8 py-8 min-h-screen">
			<h1 className="font-headline-md text-headline-md text-center mb-stack-lg text-on-surface">
				Checkout
			</h1>

			<div className="flex flex-col gap-stack-lg">
				{/* Order Summary */}
				<section className="bg-surface-container-lowest p-stack-md rounded-lg custom-shadow">
					<h2 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-stack-sm">
						Order Summary
					</h2>

					{cartItems.length === 0 ? (
						<p className="font-body-md text-body-md text-on-surface-variant text-center py-4">
							Your cart is empty.
						</p>
					) : (
						cartItems.map((item) => <CheckOutItemCard item={item} key={item.id} />)
					)}

					<div className="mt-stack-md space-y-2">
						<div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
							<span>Subtotal</span>
							<span>${subtotal}.00</span>
						</div>
						<div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
							<span>Security Deposit</span>
							<span>${totalSecurityDeposit}.00</span>
						</div>
						<div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
							<span>Delivery Fee</span>
							<span>${deliveryFee}.00</span>
						</div>
						<div className="flex justify-between pt-stack-sm mt-stack-sm border-t-2 border-surface-container border-dashed">
							<span className="font-headline-sm text-headline-sm text-on-surface">Total</span>
							<span className="font-headline-sm text-headline-sm font-bold text-primary">
								${totalAmount}.00
							</span>
						</div>
					</div>
				</section>


				{/* Delivery Details */}
				<section className="space-y-stack-md">
					<div className="flex flex-col gap-2">
						<label
							className="font-label-md text-label-md text-on-surface-variant"
							htmlFor="phone"
						>
							Phone Number
						</label>

						<input
							className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md input-focus transition-all"
							id="phone"
							placeholder="+91 00000 00000"
							type="tel"
							value={formData.phone}
							onChange={handleChange}
							name="phone"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label
							className="font-label-md text-label-md text-on-surface-variant"
							htmlFor="address"
						>
							Delivery Address
						</label>
						<textarea
							className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md input-focus transition-all resize-none"
							id="address"
							placeholder="Enter your full street address, apartment, and city"
							rows="3"
							value={formData.address}
							onChange={handleChange}
							name="address"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label
							className="font-label-md text-label-md text-on-surface-variant"
							htmlFor="notes"
						>
							Optional Notes
						</label>
						<textarea
							className="w-full p-4 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md input-focus transition-all resize-none"
							id="notes"
							placeholder="Any special instructions for delivery?"
							rows="2"
							value={formData.notes}
							onChange={handleChange}
							name="notes"
						/>
					</div>
				</section>

				{/* Payment Method Info */}
				<section>
					<h2 className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-stack-sm">
						Payment Method
					</h2>
					<div className="flex items-center gap-stack-sm p-stack-md border-2 border-primary-container/20 bg-surface-container-lowest rounded-xl custom-shadow transition-all hover:border-primary-container/40">
						<div className="w-12 h-12 flex items-center justify-center bg-primary-container/10 rounded-lg">
							<span className="material-symbols-outlined text-primary-container text-3xl">
								credit_card
							</span>
						</div>
						<div>
							<p className="font-body-md text-body-md font-semibold text-on-surface">
								Stripe Checkout
							</p>
							<p className="font-caption text-caption text-on-surface-variant">
								You'll be redirected to Stripe's secure payment page.
							</p>
						</div>
						<div className="ml-auto">
							<span className="material-symbols-outlined text-primary-container icon-filled">
								check_circle
							</span>
						</div>
					</div>
				</section>

				{(validationError || error) && (
					<div className="flex items-start gap-2 p-3 bg-error-container/20 border border-error/30 rounded-lg">
						<span className="material-symbols-outlined text-error text-[18px] mt-0.5">
							error
						</span>
						<p className="font-body-sm text-body-sm text-error">
							{validationError || error}
						</p>
					</div>
				)}

				{/* Pay Button */}
				<button
					className="w-full py-4 bg-[#43766C] text-white font-label-md text-label-md rounded-[12px] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
					onClick={handlePayment}
					disabled={isLoading || cartItems.length === 0}
				>
					{isLoading ? (
						<>
							<span className="material-symbols-outlined text-sm animate-spin">
								progress_activity
							</span>
							Preparing Payment…
						</>
					) : (
						<>
							<span className="material-symbols-outlined text-sm">lock</span>
							Pay with Stripe • ${totalAmount}.00
						</>
					)}
				</button>

				<p className="text-center font-caption text-caption text-on-surface-variant flex items-center justify-center gap-1">
					<span className="material-symbols-outlined text-[14px]">verified_user</span>
					Your transaction is protected by 256-bit SSL encryption.
				</p>
			</div>
		</main>
	);
};

export default CheckOut;