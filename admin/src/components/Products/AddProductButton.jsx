import { Link } from "react-router-dom";

const AddProductButton = () => {
	return (
		<div className="flex justify-end m-4">
			<Link
				to="/admin/products/add"
				className="flex items-center gap-2 text-white bg-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
			>
				<span className="material-symbols-outlined text-lg text-white">add</span>
				Add Product
			</Link>
		</div>
	);
};

export default AddProductButton;