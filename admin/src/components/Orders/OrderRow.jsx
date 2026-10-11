import { formatDate, paymentStyles, statusStyles } from "../../helper"

const OrderRow = ({ order }) => {
	return (
		<tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
			<td className="py-3 px-4 font-medium">#{order.id.slice(-5).toUpperCase()}</td>
			<td className="py-3 px-4">{order.user.full_name}</td>
			<td className="py-3 px-4">
				{order.items.map((item) => item.name).join(", ")}
			</td>
			<td className="py-3 px-4">+91 {order.phone}</td>
			<td className="py-3 px-4">${order.totalAmount}</td>
			<td className="py-3 px-4">  {formatDate(order.createdAt)}</td>
			<td className="py-3 px-4">
				<span
					className={`px-2 py-1 rounded-full text-xs ${paymentStyles[order.paymentStatus] || "bg-gray-100 text-gray-700"
						}`}
				>
					{order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
				</span>
			</td>
			<td className="py-3 px-4">
				<span
					className={`px-2 py-1 rounded-full text-xs ${statusStyles[order.orderStatus] || "bg-gray-100 text-gray-700"
						}`}
				>
					{order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
				</span>
			</td>
			<td className="py-3 px-4">
				<div className="flex gap-3">
					<button className="text-blue-600 hover:text-blue-800">
						<span className="material-symbols-outlined text-lg">edit</span>
					</button>
					<button className="text-red-600 hover:text-red-800">
						<span className="material-symbols-outlined text-lg">delete</span>
					</button>
				</div>
			</td>
		</tr>
	)
}

export default OrderRow
