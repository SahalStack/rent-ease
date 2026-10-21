import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { statusButtons } from "../../../data";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { cancelOrder } from "./orderThunk";
import { selectCancellingOrderId } from "./orderSelectors";

const OrderCard = ({ order, item }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

	const cancellingOrderId = useSelector(selectCancellingOrderId);
	const isCancelling = cancellingOrderId === order._id;

	const {
		name,
		category,
		image,
		duration,
		price,
		deliveryStartDate,
		rentalEndDate,
	} = item;

	const {
		orderStatus,
	} = order;

	const statusStyles = {
		pending: "bg-yellow-500 text-white",
		active: "bg-green-500 text-white",
		completed: "bg-blue-500 text-white",
		cancelled: "bg-red-500 text-white",
		returned: "bg-gray-400 text-white"
	};

	const badgeClass = statusStyles[orderStatus] || "status-badge-active";
	const buttons = statusButtons[orderStatus] || [];

	const formatDate = (dateStr) => {
		if (!dateStr) return "—";
		return new Date(dateStr).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const handleAction = (action) => {
		if (action === "view") navigate(`/orders/${order._id}`);
		if (action === "cancel") setIsCancelDialogOpen(true);
		if (action === "extend") navigate(`/orders/${order._id}/extend`);
		if (action === "maintenance") navigate(`/orders/${order._id}/maintenance`);
		if (action === "report") navigate(`/orders/${order._id}/report`);
		if (action === "return") navigate(`/orders/${order._id}/return`);
		if (action === "rentAgain") navigate(`/products/${item.productId}`);
	};

	const handleConfirmCancel = async () => {
		try {
			await dispatch(cancelOrder(order._id)).unwrap();
			toast.success("Order cancelled successfully");
			setIsCancelDialogOpen(false);
		} catch (error) {
			toast.error(error || "Failed to cancel order");
		}
	};

	return (
		<div className="bg-surface-container-lowest p-stack-md md:p-stack-lg rounded-2xl order-card flex flex-col lg:flex-row gap-gutter items-start lg:items-center">

			<div className="w-full lg:w-48 h-48 rounded-xl overflow-hidden shrink-0 bg-surface-container">
				<img
					src={image}
					alt={name}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-stack-md">

				<div className="space-y-1">
					<h4 className="font-headline-sm text-headline-sm text-on-surface">{name}</h4>
					<p className="font-body-md text-body-md text-on-surface-variant">{category}</p>
					<div className="mt-4 grid grid-cols-2 gap-x-gutter gap-y-1">
						<div>
							<p className="font-caption text-caption text-outline uppercase tracking-wider">Duration</p>
							<p className="font-body-md text-body-md">{duration} Months</p>
						</div>
						<div>
							<p className="font-caption text-caption text-outline uppercase tracking-wider">Price</p>
							<p className="font-body-md text-body-md font-semibold text-primary">${price}.00/mo</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-x-gutter gap-y-1">
					<div>
						<p className="font-caption text-caption text-outline uppercase tracking-wider">Start Date</p>
						<p className="font-body-md text-body-md">{formatDate(deliveryStartDate)}</p>
					</div>
					<div>
						<p className="font-caption text-caption text-outline uppercase tracking-wider">End Date</p>
						<p className="font-body-md text-body-md">{formatDate(rentalEndDate)}</p>
					</div>
					<div className="col-span-2 pt-2">
						<span
							className={`inline-flex items-center px-4 py-1.5 rounded-full text-label-md font-label-md ${badgeClass}`}
						>
							<span className="w-2 h-2 rounded-full bg-white mr-2"></span>
							{orderStatus
								? orderStatus.charAt(0).toUpperCase() + orderStatus.slice(1)
								: "Unknown"}
						</span>
					</div>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-52 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-outline-variant/30 lg:pl-stack-lg">
				{buttons.map((btn) => (
					<button
						key={btn.action}
						onClick={() => handleAction(btn.action)}
						className={`w-full py-3 px-4 rounded-lg font-label-md text-label-md transition-colors text-center wrap-break-words ${btn.className}`}
					>
						{btn.label}
					</button>
				))}
			</div>

			<ConfirmDialog
				isOpen={isCancelDialogOpen}
				title="Cancel this order?"
				message={`Are you sure you want to cancel "${name}"? The rental will be cancelled and this action cannot be undone.`}
				confirmLabel="Yes, cancel order"
				cancelLabel="Keep order"
				isLoading={isCancelling}
				onConfirm={handleConfirmCancel}
				onClose={() => setIsCancelDialogOpen(false)}
			/>
		</div>
	);
};

export default OrderCard;
