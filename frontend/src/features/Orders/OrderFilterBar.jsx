import { useDispatch, useSelector } from "react-redux";
import { orderSortOptions, orderStatusOptions } from "../../../data"
import OrderSortDropdown from "./OrderSortDropdown"
import {
	setSearchQuery,
	setStatusFilter,
	setSortBy,

} from "./orderSlice";
import {
	selectSearchQuery,
	selectSortBy,
	selectStatusFilter,
} from "./orderSelectors";


const OrderFilterBar = () => {

	const dispatch = useDispatch();

	const searchQuery = useSelector(selectSearchQuery);
	const statusFilter = useSelector(selectStatusFilter);
	const sortBy = useSelector(selectSortBy);

	return (
		<div className="flex flex-col md:flex-row gap-gutter items-center bg-surface-container-low p-stack-md rounded-xl">
			<div className="relative w-full md:flex-1">
				<span
					className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
				<input
					className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none font-body-md text-body-md"
					placeholder="Search order names..."
					type="text"
					value={searchQuery}
					onChange={(e) => dispatch(setSearchQuery(e.target.value))}
				/>
			</div>

			<div className="flex gap-stack-md w-full md:w-auto">
				<OrderSortDropdown
					placeholder="All Orders"
					options={orderStatusOptions}
					value={statusFilter}
					onChange={(e) =>
						dispatch(setStatusFilter(e.target.value))
					}
				/>

				<OrderSortDropdown
					placeholder="Sort By"
					options={orderSortOptions}
					value={sortBy}
					onChange={(e) =>
						dispatch(setSortBy(e.target.value))
					}
				/>
			</div>
		</div>
	)
}

export default OrderFilterBar
