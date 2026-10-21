import { Link } from "react-router-dom";

const OrderNotFound = ({ message }) => {
	return (
		<div className="w-full flex flex-col items-center justify-center py-20 text-center">
			<span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
				receipt_long
			</span>

			<p className="text-headline-sm font-headline-sm text-on-surface-variant">
				Order Not Found
			</p>

			<p className="text-body-md text-outline mt-2 text-center max-w-md">
				{message ||
					"We couldn't find the order you're looking for. It may have been removed, or the order ID may be invalid."}
			</p>

			<Link
				to="/orders"
				className="mt-6 px-6 py-3 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:opacity-95 transition-all active:scale-95"
			>
				Back to My Orders
			</Link>
		</div>
	)
}

export default OrderNotFound
