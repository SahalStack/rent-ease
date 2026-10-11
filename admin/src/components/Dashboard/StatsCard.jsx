import { memo } from "react";
import Card from "./Card";

const labels = {
	totalUsers: "Total Users",
	totalProducts: "Total Products",
	totalOrders: "Total Orders",
	activeRentals: "Active Rentals",
	totalRevenue: "Total Revenue",
	pendingOrders: "Pending Orders",
	pendingReturns: "Pending Returns",
	outOfStockProducts: "Out of Stock Products",
};

const StatsCard = ({ summary }) => {
	return (
		<div className="grid grid-cols-4 gap-4 mb-10">
			{Object.entries(summary).map(([key, value]) => (
				<Card
					key={key}
					title={labels[key] || key}
					value={key === "totalRevenue" ? `₹${value}` : value}
				/>
			))}
		</div>
	);
};

export default memo(StatsCard);