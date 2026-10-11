import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { verifyOrder } from "../features/Orders/orderThunk";
import ContentLoader from "../ui/ContentLoader";

const Success = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [showContent, setShowContent] = useState(false);

	const { isLoading, currentOrder, error } = useSelector((state) => state.orders);

	useEffect(() => {
		const sessionId = searchParams.get("session_id");
		if (!sessionId) { navigate("/"); return; }

		dispatch(verifyOrder(sessionId)).then((result) => {
			if (verifyOrder.fulfilled.match(result)) {
				dispatch(clearCart());
			}
		});
		setTimeout(() => setShowContent(true), 1700);
	}, []);

	if (isLoading) return <ContentLoader text="Verifying your payment..." />;
	if (error) return <p className="text-error text-center mt-10">Something went wrong: {error}</p>;

	return (
		<main className="relative min-h-screen bg-surface px-4 py-10 sm:py-16 overflow-hidden">

			{/* Ripple animation - untouched */}
			<div className="phonepay-overlay">
				<div className="ripple r1" />
				<div className="ripple r2" />
				<div className="check-circle">
					<svg width="40" height="40" viewBox="0 0 40 40" fill="none">
						<path
							className="check-path"
							d="M8 20 L17 29 L33 13"
							stroke="#1D9E75"
							strokeWidth="3.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>

			<div
				className={`max-w-md sm:max-w-lg mx-auto transition-all duration-700 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
			>
				{/* Status line */}
				<div className="text-center mb-8">
					<p className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary mb-2">
						Payment Confirmed
					</p>
					<h1 className="font-headline-md text-2xl sm:text-headline-md text-on-surface">
						You're all set
					</h1>
					<p className="font-body-md text-body-md text-on-surface-variant mt-1">
						A confirmation has been sent to your phone.
					</p>
				</div>

				{/* Receipt card */}
				{currentOrder && (
					<div className="relative bg-surface-container-lowest rounded-[28px] shadow-[0_24px_48px_-20px_rgba(0,0,0,0.12)] overflow-hidden">

						{/* Top strip */}
						<div className="bg-primary px-6 sm:px-8 py-5 flex items-center justify-between">
							<div>
								<p className="text-on-primary/70 text-caption uppercase tracking-widest">Order ID</p>
								<p className="text-on-primary font-semibold text-body-md">
									#{currentOrder._id.slice(-6).toUpperCase()}
								</p>
							</div>
							<span className="px-3 py-1 rounded-full bg-on-primary/15 text-on-primary text-caption font-semibold uppercase tracking-wide">
								{currentOrder.paymentStatus}
							</span>
						</div>

						{/* Items */}
						<div className="px-6 sm:px-8 py-6 space-y-5">
							{currentOrder.items.map((item) => (
								<div key={item._id} className="flex gap-4 items-center">
									<img
										src={item.image}
										alt={item.name}
										className="w-16 h-16 rounded-2xl object-cover bg-surface-container shrink-0"
									/>
									<div className="flex-1 min-w-0">
										<p className="text-on-surface font-semibold text-body-md truncate">{item.name}</p>
										<p className="text-on-surface-variant text-body-sm">
											Qty {item.quantity} · {item.duration} months
										</p>
									</div>
									<p className="text-on-surface font-semibold text-body-md tabular-nums shrink-0">
										${item.itemTotal}.00
									</p>
								</div>
							))}
						</div>

						{/* Perforated divider */}
						<div className="relative px-6 sm:px-8">
							<div className="border-t-2 border-dashed border-outline-variant/50" />
							<div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface" />
							<div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface" />
						</div>

						{/* Cost breakdown */}
						<div className="px-6 sm:px-8 py-6 space-y-2.5 text-body-sm">
							<div className="flex justify-between text-on-surface-variant">
								<span>Subtotal</span>
								<span className="tabular-nums">${currentOrder.subtotal}.00</span>
							</div>
							<div className="flex justify-between text-on-surface-variant">
								<span>Security Deposit</span>
								<span className="tabular-nums">${currentOrder.totalSecurityDeposit}.00</span>
							</div>
							<div className="flex justify-between text-on-surface-variant">
								<span>Delivery Fee</span>
								<span className="tabular-nums">${currentOrder.deliveryFee}.00</span>
							</div>

							<div className="flex justify-between items-baseline pt-4 mt-2 border-t border-outline-variant/40">
								<span className="text-on-surface font-semibold text-body-md">Total Paid</span>
								<span className="text-primary font-bold text-xl sm:text-headline-sm tabular-nums">
									${currentOrder.totalAmount}.00
								</span>
							</div>
						</div>

						{/* Delivery footer */}
						<div className="bg-surface-container px-6 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-caption text-on-surface-variant">
							<span className="material-symbols-outlined text-[16px] leading-none">local_shipping</span>
							<span className="truncate">
								Delivering to <span className="text-on-surface font-medium">{currentOrder.address}</span>
							</span>
						</div>
					</div>
				)}

				{/* CTA */}
				<button
					onClick={() => navigate("/orders")}
					className="w-full h-12 mt-6 bg-primary-container text-on-primary font-bold rounded-xl shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
				>
					Track My Orders
				</button>
			</div>
		</main>
	);
};

export default Success;