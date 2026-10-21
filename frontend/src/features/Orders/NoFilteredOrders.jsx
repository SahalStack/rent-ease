import { useDispatch, useSelector } from "react-redux";
import { resetFilters } from "./orderSlice";
import { selectSearchQuery, selectStatusFilter } from "./orderSelectors";

const NoFilteredOrders = () => {
	const dispatch = useDispatch();
	const statusFilter = useSelector(selectStatusFilter);
	const searchQuery = useSelector(selectSearchQuery);

	return (
		<div className="flex flex-col items-center justify-center py-section-padding text-center animate-fadeUp">
			<span
				className="material-symbols-outlined text-[72px] text-on-surface-variant/40"
				style={{ fontVariationSettings: "'wght' 200" }}
			>
				filter_alt_off
			</span>

			<h2 className="font-headline-sm text-headline-sm text-on-surface mt-6">
				No Orders Match Your Filters
			</h2>

			<p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm">
				{statusFilter !== "all"
					? `There are no ${statusFilter} orders right now.`
					: `No orders match "${searchQuery.trim()}".`}{" "}
				Try a different status or clear the filters to see all of your orders.
			</p>

			<button
				type="button"
				onClick={() => dispatch(resetFilters())}
				className="mt-8 bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-body-md hover:bg-primary-container transition-all"
			>
				Clear Filters
			</button>
		</div>
	);
};

export default NoFilteredOrders;
