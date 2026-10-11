import ProductRow from "./ProductRow";
import renderStatus from "../../utils/RenderStatus";

const ProductsTable = ({ onEdit, products, isLoading, error }) => {

	const status = renderStatus(isLoading, products.length === 0, error, 'products')
	if (status) return status;

	return (
		<div className="border border-gray-300 rounded-lg overflow-hidden">
			<table className="w-full text-sm text-left border-collapse">
				<thead>
					<tr className="border-b border-gray-200 text-gray-500">
						<th className="py-3 px-4">Image</th>
						<th className="py-3 px-4">Name</th>
						<th className="py-3 px-4">Category</th>
						<th className="py-3 px-4">Price</th>
						<th className="py-3 px-4">Deposit</th>
						<th className="py-3 px-4">Stock</th>
						<th className="py-3 px-4">Edit</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<ProductRow key={product._id} product={product} onEdit={onEdit} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductsTable;
