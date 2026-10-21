import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { statsData } from "../../data";

import OrderFilterBar from "../features/Orders/OrderFilterBar";
import OrderTitle from "../features/Orders/OrderTitle";
import StatsCard from "../features/Orders/StatsCard";
import EmptyOrders from "../features/Orders/EmptyOrders";
import NoFilteredOrders from "../features/Orders/NoFilteredOrders";
import {
	selectAllOrders,
	selectFilteredOrders,
	selectOrdersError,
	selectOrdersLoading,
	selectOrderStats,
} from "../features/Orders/orderSelectors";
import OrderCard from "../features/Orders/OrderCard";
import { fetchOrders } from "../features/Orders/orderThunk";
import PageLoader from "../ui/PageLoader";
import ErrorState from "../ui/ErrorState";
import usePageTitle from "../hooks/usePageTitle";

const Orders = () => {
	const dispatch = useDispatch();

	usePageTitle("Orders");

	useEffect(() => {
		dispatch(fetchOrders());
	}, [dispatch]);

	const allOrders = useSelector(selectAllOrders);
	const orders = useSelector(selectFilteredOrders);
	const statsValue = useSelector(selectOrderStats);
	const loading = useSelector(selectOrdersLoading);
	const error = useSelector(selectOrdersError);

	const hasOrders = allOrders.length > 0;

	return (
		<main className="max-w-container-max mx-auto px-margin-desktop py-stack-lg space-y-stack-lg animate-fadeUp">

			<OrderTitle />

			{loading ? (
				<PageLoader />

			) : error && !hasOrders ? (
				<ErrorState
					message={error}
					onRetry={() => dispatch(fetchOrders())}
				/>

			) : !hasOrders ? (
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

					{orders.length === 0 ? (
						<NoFilteredOrders />
					) : (
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
					)}
				</>
			)}
		</main>
	);
};

export default Orders;
