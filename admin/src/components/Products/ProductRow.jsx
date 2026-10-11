import { memo } from "react"

const ProductRow = ({ product, onEdit }) => {
	return (
		<tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
			<td className="py-3 px-4">
				<img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
			</td>
			<td className="py-3 px-4 font-medium">{product.name}</td>
			<td className="py-3 px-4 capitalize">{product.category}</td>
			<td className="py-3 px-4">${product.price}</td>
			<td className="py-3 px-4">${product.securityDeposit}</td>
			<td className="py-3 px-4">
				<span className={`px-2 py-1 rounded-full text-xs ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
					{product.inStock ? "In Stock" : "Out of Stock"}
				</span>
			</td>
			<td className="py-3 px-4">
				<div className="flex gap-3">
					<button
						className="text-blue-600 hover:text-blue-800"
						onClick={() => onEdit(product)}
					>
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

export default memo(ProductRow)
