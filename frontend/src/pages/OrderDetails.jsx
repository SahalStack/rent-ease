import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById } from "../features/Orders/orderThunk";
import { formattedDate } from "../utils/helpers";
import ContentLoader from "../ui/ContentLoader";
import OrderNotFound from "../ui/OrderNotFound";
import usePageTitle from "../hooks/usePageTitle";
import ReviewForm from "../features/Review/ReviewForm";

const capitalize = (text) =>
	text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

const OrderDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	const { currentOrder, isDetailsLoading, error } = useSelector(
		(state) => state.orders
	);

	useEffect(() => {
		dispatch(fetchOrderById(id));
	}, [dispatch, id]);

	usePageTitle("Order Details");

	if (isDetailsLoading) {
		return (
			<main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg animate-fadeUp">
				<ContentLoader text="Loading Order Details..." />
			</main>
		);
	}

	if (error || !currentOrder) {
		return (
			<main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg animate-fadeUp">
				<OrderNotFound message={error} />
			</main>
		);
	}

	const order = currentOrder;
	const items = order.items ?? [];
	const user = order.user ?? {};
	const address = user.address ?? {};

	const duration = items[0]?.duration;
	const deposit = items[0]?.securityDeposit;
	const productId = items[0]?._id;

	const orderDate = order.createdAt ? formattedDate(order.createdAt) : "—";
	const orderReference = order._id ? order._id.slice(-6).toUpperCase() : "—";

	return (
		<main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg animate-fadeUp">
			<div className="flex flex-col md:flex-row md:items-center justify-between mb-stack-lg gap-gutter">
				<div className="flex items-center gap-4">
					<Link to="/orders" className="w-10 h-10 flex items-center justify-center rounded-full border-1.5 border-outline-variant text-primary hover:bg-primary-fixed transition-colors active:scale-95">
						<span className="material-symbols-outlined">arrow_back</span>
					</Link >
					<h1 className="font-display-lg text-headline-md text-on-surface">Order Details</h1>
				</div>
				<div className="flex gap-stack-sm">
					{order.orderStatus === "active" && (
						<button className="px-8 py-2.5 bg-primary text-on-primary rounded-lg font-label-md shadow-sm hover:opacity-95 transition-all active:scale-95">
							Extend Rental
						</button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
				<div className="lg:col-span-8 space-y-gutter">
					<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md border border-surface-variant/30">
						<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
							<div>
								<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Order ID</p>
								<p className="font-body-lg font-semibold truncate  text-on-surface">#{orderReference}</p>
							</div>
							<div>
								<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Order Date</p>
								<p className="font-body-lg font-semibold text-on-surface">{orderDate}</p>
							</div>
							<div>
								<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Payment Status</p>
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container">
									{capitalize(order.paymentStatus)}
								</span>
							</div>
							<div>
								<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Rental Status</p>
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed">
									{capitalize(order.orderStatus)}
								</span>
							</div>
						</div>
					</div>

					{items.map((item) => {
						return (
							<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md flex flex-col md:flex-row gap-stack-md border border-surface-variant/30 overflow-hidden" key={item._id}>
								<div className="w-full md:w-64 h-48 rounded-lg overflow-hidden shrink-0 bg-white">
									<img className="w-full h-full object-cover"
										data-alt="A luxurious forest green velvet sectional sofa positioned in a bright, sun-drenched minimalist living room with cream walls and light oak floors. The lighting is soft and airy, emphasizing the rich texture of the velvet fabric and the clean, modern lines of the furniture. The overall aesthetic is one of quiet luxury, combining warmth with sophisticated contemporary design for a high-end residential setting."
										src={item.image} alt={item.name} />
								</div>

								<div className="grow flex flex-col justify-between py-2" >
									<div>
										<div className="flex justify-between items-start mb-2">
											<div>
												<h2 className="font-headline-sm text-on-surface">{item.name}</h2>
												<p className="text-on-surface-variant font-body-md">Living Room • Premium Collection</p>
											</div>
											<div className="text-right">
												<p className="text-primary font-bold text-headline-sm">${item.price}.00<span className="text-body-md font-normal text-on-surface-variant">/mo</span></p>
											</div>
										</div>
										<div className="flex gap-4 mt-4">
											<div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg">
												<span className="material-symbols-outlined text-primary text-sm">calendar_today</span>
												<span className="text-body-md font-medium">{item.duration} Months Duration</span>
											</div>
											<div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-lg">
												<span className="material-symbols-outlined text-primary text-sm">verified_user</span>
												<span className="text-body-md font-medium">Full Warranty</span>
											</div>
										</div>
									</div>
									<div className="mt-stack-md">
										<Link to={`/products/${item._id}`} className="text-primary font-semibold flex items-center gap-1">
											View Product Details <span className="material-symbols-outlined">chevron_right</span>
										</Link>
									</div>
								</div>
							</div>
						)
					})}

					{["active", "completed"].includes(order.orderStatus) && productId && (
						<ReviewForm productId={productId} />
					)}
				</div>

				<div className="lg:col-span-4 space-y-gutter">

					<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md border border-surface-variant/30">
						<div className="flex items-center gap-2 mb-stack-sm">
							<span className="material-symbols-outlined text-primary">location_on</span>
							<h3 className="font-headline-sm">Delivery Address</h3>
						</div>
						{address.fullAddress ? (
							<div className="space-y-1 text-on-surface-variant">
								{user.full_name && (
									<p className="text-on-surface font-semibold text-body-lg">{user.full_name.toUpperCase()}</p>
								)}
								<p>{address.fullAddress.toUpperCase()}</p>
								<p>{[address.city, address.state, address.postalCode].filter(Boolean).join(", ").toUpperCase()}</p>
								{address.country && <p>{address.country.toUpperCase()}</p>}
								{user.phone && (
									<p className="pt-2 flex items-center gap-2">
										<span className="material-symbols-outlined text-sm">phone</span>
										{user.phone}
									</p>
								)}
							</div>
						) : (
							<p className="text-body-md text-on-surface-variant">
								No delivery address was saved for this order.
							</p>
						)}
					</div>

					<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md border border-surface-variant/30">
						<div className="flex items-center gap-2 mb-stack-sm">
							<span className="material-symbols-outlined text-primary">receipt_long</span>
							<h3 className="font-headline-sm">Payment Summary</h3>
						</div>
						<div className="space-y-3">
							<div className="flex justify-between text-on-surface-variant">
								<span>Item Total ({duration} Months)</span>
								<span>${order.subtotal ?? 0}.00</span>
							</div>
							<div className="flex justify-between text-on-surface-variant">
								<span>Security Deposit</span>
								<span>${order.totalSecurityDeposit ?? 0}.00</span>
							</div>
							<div className="flex justify-between text-on-surface-variant">
								<span>Delivery &amp; Setup Fee</span>
								<span>${order.deliveryFee ?? 0}.00</span>
							</div>
							<div className="pt-3 mt-3 border-t border-surface-variant flex justify-between items-center">
								<span className="text-on-surface font-bold text-body-lg">Total Amount Paid</span>
								<span className="text-primary font-bold text-headline-sm">${order.totalAmount ?? 0}.00</span>
							</div>
						</div>
						{deposit !== undefined && (
							<div className="mt-stack-md p-3 bg-secondary-container/30 rounded-lg flex items-start gap-3">
								<span className="material-symbols-outlined text-on-secondary-container mt-0.5">info</span>
								<p className="text-caption text-on-secondary-container leading-relaxed">
									Security deposit of ${deposit}.00 is fully refundable at the end of the rental period, subject to item condition.
								</p>
							</div>
						)}
					</div>

					<div className="bg-primary/5 rounded-xl p-stack-md border border-primary/10">
						<h4 className="font-semibold text-primary mb-2">Need help with this order?</h4>
						<p className="text-body-md text-on-surface-variant mb-4">Our support team is available 24/7 for any assistance regarding your rental.</p>
						<button className="w-full flex items-center justify-center gap-2 py-2.5 text-primary border-1.5 border-primary rounded-lg font-semibold hover:bg-primary-fixed transition-colors active:scale-95">
							<span className="material-symbols-outlined text-[20px]">support_agent</span>
							Contact Support
						</button>
					</div>
				</div>

			</div>
		</main>
	)
}

export default OrderDetails
