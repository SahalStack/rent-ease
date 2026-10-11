import { Link } from "react-router-dom"

const OrderTitle = () => {
	return (
		<div className="space-y-stack-sm">
			<div className="flex items-center gap-3">
				<Link to="/products" className="w-10 h-10 flex items-center justify-center rounded-full border-1.5 border-outline-variant text-primary hover:bg-primary-fixed transition-colors active:scale-95">
					<span className="material-symbols-outlined">arrow_back</span>
				</Link>
				<h1 className="font-display-lg text-headline-md md:text-display-lg text-on-surface">My Orders</h1>
			</div>

			<p className="font-body-lg text-body-lg text-on-surface-variant">Track and manage your active and previous rentals.</p>
		</div>
	)
}

export default OrderTitle