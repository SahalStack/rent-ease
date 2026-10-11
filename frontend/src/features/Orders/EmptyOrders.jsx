// features/Order/EmptyOrders.jsx
import { Link } from "react-router-dom";

const EmptyOrders = () => {
	return (
		<div className="flex flex-col items-center justify-center py-section-padding text-center animate-float">
			<span
				className="material-symbols-outlined text-[80px] text-on-surface-variant/40"
				style={{ fontVariationSettings: "'wght' 200" }}
			>
				receipt_long
			</span>
			<h2 className="font-headline-sm text-headline-sm text-on-surface mt-6">
				No Orders Yet
			</h2>
			<p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm">
				Looks like you haven't placed any orders yet. Start renting your favourite furniture and appliances!
			</p>
			<Link
				to="/products"
				className="mt-8 bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-body-md hover:bg-primary-container transition-all"
			>
				Browse Products
			</Link>
		</div>
	);
};

export default EmptyOrders;