import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsData } from "../../data";

import OrderFilterBar from "../features/Orders/OrderFilterBar";
import OrderTitle from "../features/Orders/OrderTitle";
import StatsCard from "../features/Orders/StatsCard";
import EmptyOrders from "../features/Orders/EmptyOrders";
import {
	selectFilteredOrders,
	selectOrdersLoading,
	selectOrderStats,
} from "../features/Orders/orderSelectors";
import OrderCard from "../features/Orders/OrderCard";
import { fetchOrders } from "../features/Orders/orderThunk";
import PageLoader from '../ui/PageLoader'
import usePageTitle from "../hooks/usePageTitle";

const Orders = () => {
	const dispatch = useDispatch();

	usePageTitle("Orders");

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	const orders = useSelector(selectFilteredOrders);
	const statsValue = useSelector(selectOrderStats);
	const loading = useSelector(selectOrdersLoading);

	return (
		<main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg space-y-stack-lg animate-fadeUp">

			<OrderTitle />

			{loading ? (
				<PageLoader />

			) : orders.length === 0 ? (
				<EmptyOrders />

			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
						{statsData.map((stat) => (
							<StatsCard
								key={stat.title}
								title={stat.title}
								value={statsValue[stat.value]}
								color={stat.color}
							/>
						))}
					</div>

					<OrderFilterBar />

					<div className="space-y-stack-md">
						{orders.map((order) =>
							order.items.map((item) => (
								<OrderCard
									key={item._id}
									item={item}
									order={order}
								/>
							))
						)}
					</div>
				</>
			)}
		</main>
	);
};

export default Orders;