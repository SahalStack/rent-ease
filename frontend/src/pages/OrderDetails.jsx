import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById } from "../features/Orders/orderThunk";
import { formattedDate } from "../utils/helpers";
import ContentLoader from "../ui/ContentLoader";
import OrderNotFound from "../ui/OrderNotFound";
import usePageTitle from "../hooks/usePageTitle";
import ReviewForm from "../features/Review/ReviewForm";

const OrderDetails = () => {

	const { id } = useParams();
	const dispatch = useDispatch();

	const { currentOrder, isLoading } = useSelector((state) => state.orders);
	console.log('surrentorder from order details', currentOrder);

	const duration = currentOrder?.order?.items?.[0]?.duration;
	const deposit = currentOrder?.order?.items?.[0]?.securityDeposit;
	const productId = currentOrder?.order?.items?.[0]?._id;

	const { fullAddress, city, state, postalCode, country = 'india' } = currentOrder?.order?.user?.address || {};

	useEffect(() => {
		dispatch(fetchOrderById(id));
	}, [dispatch, id]);

	usePageTitle("Order Details");

	if (!currentOrder) return <OrderNotFound />;

	const capitalize = (text) =>
		text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

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
					{currentOrder.order.orderStatus === "active" && (
						<button className="px-8 py-2.5 bg-primary text-on-primary rounded-lg font-label-md shadow-sm hover:opacity-95 transition-all active:scale-95">
							Extend Rental
						</button>
					)}
				</div>
			</div>

			{isLoading ? (<ContentLoader text="Loading Order Details..." />) :
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
					<div className="lg:col-span-8 space-y-gutter">
						<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md border border-surface-variant/30">
							<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
								<div>
									<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Order ID</p>
									<p className="font-body-lg font-semibold truncate  text-on-surface">#{currentOrder.order._id.slice(-6).toUpperCase()}</p>
								</div>
								<div>
									<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Order Date</p>
									<p className="font-body-lg font-semibold text-on-surface">{formattedDate(currentOrder.order.createdAt)}</p>
								</div>
								<div>
									<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Payment Status</p>
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container">
										{capitalize(currentOrder?.order?.paymentStatus)}
									</span>
								</div>
								<div>
									<p className="text-caption text-on-surface-variant mb-1 uppercase tracking-widest font-semibold">Rental Status</p>
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed">
										{capitalize(currentOrder.order.orderStatus)}
									</span>
								</div>
							</div>
						</div>

						{currentOrder.order.items.map((item) => {
							return (
								<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md flex flex-col md:flex-row gap-stack-md border border-surface-variant/30 overflow-hidden" key={item._id}>
									<div className="w-full md:w-64 h-48 rounded-lg overflow-hidden shrink-0 bg-white">
										<img className="w-full h-full object-cover"
											data-alt="A luxurious forest green velvet sectional sofa positioned in a bright, sun-drenched minimalist living room with cream walls and light oak floors. The lighting is soft and airy, emphasizing the rich texture of the velvet fabric and the clean, modern lines of the furniture. The overall aesthetic is one of quiet luxury, combining warmth with sophisticated contemporary design in a high-end residential setting."
											src={item.image} />
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

						{["active", "delivered", "returned"].includes(currentOrder.order.orderStatus) && (
							<ReviewForm productId={productId} />
						)}
					</div>

					<div className="lg:col-span-4 space-y-gutter">

						<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md border border-surface-variant/30">
							<div className="flex items-center gap-2 mb-stack-sm">
								<span className="material-symbols-outlined text-primary">location_on</span>
								<h3 className="font-headline-sm">Delivery Address</h3>
							</div>
							<div className="space-y-1 text-on-surface-variant">
								<p className="text-on-surface font-semibold text-body-lg">{currentOrder.order.user.full_name.toUpperCase()}</p>
								<p>{fullAddress.toUpperCase()}</p>
								<p>{city.toUpperCase()}, {state.toUpperCase()},  {postalCode}</p>
								<p>{country.toUpperCase()}</p>
								<p className="pt-2 flex items-center gap-2">
									<span className="material-symbols-outlined text-sm">phone</span>
									{currentOrder.order.user.phone}
								</p>
							</div>
						</div>

						<div className="bg-surface-container-lowest order-card-shadow rounded-xl p-stack-md border border-surface-variant/30">
							<div className="flex items-center gap-2 mb-stack-sm">
								<span className="material-symbols-outlined text-primary">receipt_long</span>
								<h3 className="font-headline-sm">Payment Summary</h3>
							</div>
							<div className="space-y-3">
								<div className="flex justify-between text-on-surface-variant">
									<span>Item Total ({duration} Months)</span>
									<span>${currentOrder.order.subtotal}.00</span>
								</div>
								<div className="flex justify-between text-on-surface-variant">
									<span>Security Deposit</span>
									<span>${currentOrder.order.totalSecurityDeposit}.00</span>
								</div>
								<div className="flex justify-between text-on-surface-variant">
									<span>Delivery &amp; Setup Fee</span>
									<span>${currentOrder.order.deliveryFee}.00</span>
								</div>
								{/* <div className="flex justify-between text-on-surface-variant">
								<span>Tax</span>
								<span>$42.35</span>
							</div> */}
								<div className="pt-3 mt-3 border-t border-surface-variant flex justify-between items-center">
									<span className="text-on-surface font-bold text-body-lg">Total Amount Paid</span>
									<span className="text-primary font-bold text-headline-sm">${currentOrder.order.totalAmount}.00</span>
								</div>
							</div>
							<div className="mt-stack-md p-3 bg-secondary-container/30 rounded-lg flex items-start gap-3">
								<span className="material-symbols-outlined text-on-secondary-container mt-0.5">info</span>
								<p className="text-caption text-on-secondary-container leading-relaxed">
									Security deposit of ${deposit}.00 is fully refundable at the end of the rental period, subject to item condition.
								</p>
							</div>
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


			}
		</main>
	)
}

export default OrderDetails
