import renderStatus from "../../utils/RenderStatus";
import useOrders from "../../hooks/useOrders";
import OrderRow from "./OrderRow";

export default function OrdersTable() {
	const { orders, isLoading, error } = useOrders();

	const status = renderStatus(isLoading, error, orders.length === 0, "orders");
	if (status) return status;

	return (
		<div className="border border-gray-300 rounded-lg overflow-hidden">
			<table className="w-full text-sm text-left border-collapse">
				<thead>
					<tr className="border-b border-gray-200 text-gray-500">
						<th className="py-3 px-4">Order ID</th>
						<th className="py-3 px-4">Customer</th>
						<th className="py-3 px-4">Item</th>
						<th className="py-3 px-4">Phone</th>
						<th className="py-3 px-4">Price</th>
						<th className="py-3 px-4">Order On</th>
						<th className="py-3 px-4">Payment</th>
						<th className="py-3 px-4">Status</th>
						<th className="py-3 px-4">Action</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<OrderRow order={order} key={order._id} />
					))}
				</tbody>
			</table>
		</div>
	);
}