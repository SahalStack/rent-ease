/* eslint-disable */
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";
import FormInput from "../../ui/FormInput";
import { updateProduct } from "../../services/productApi";

const EditProductModal = ({ onClose, product, isOpen, refreshProducts, editProduct }) => {

	const [form, setForm] = useState({
		name: product?.name || "",
		category: product?.category || "furniture",
		price: product?.price ?? "",
		securityDeposit: product?.securityDeposit ?? "",
		description: product?.description || "",
		inStock: product?.inStock ?? true,
	});

	useEffect(() => {
		setForm({
			name: product?.name || "",
			category: product?.category || "furniture",
			price: product?.price ?? "",
			securityDeposit: product?.securityDeposit ?? "",
			description: product?.description || "",
			inStock: product?.inStock ?? true,
		});
	}, [product]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: name === "inStock" ? value === "true" : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await editProduct(product._id, form);
			onClose();
		} catch (error) {
			toast.error(error.message)
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Manage Product"
			description="View product details and manage product information, pricing, and availability."
			size="lg"
		>
			<div className="space-y-6">
				<div>
					<h3 className="mb-4 text-sm font-semibold text-gray-900">
						Product Information
					</h3>

					<div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
						<FormInput
							label="Product Name"
							name="name"
							value={form.name}
							onChange={handleChange}
							placeholder="Enter product name"
							required
						/>

						<div className="space-y-1.5">
							<label
								htmlFor="category"
								className="block text-sm font-medium text-gray-700"
							>
								Category
							</label>

							<select
								id="category"
								name="category"
								value={form.category}
								onChange={handleChange}
								className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
							>
								<option value="furniture">Furniture</option>
								<option value="bedroom">Bedroom</option>
								<option value="dining">Dining</option>
								<option value="office">Office</option>
								<option value="appliances">Appliances</option>
								<option value="electronics">Electronics</option>
							</select>
						</div>

						<FormInput
							label="Monthly Price"
							name="price"
							type="number"
							value={form.price}
							onChange={handleChange}
							placeholder="Enter monthly price"
							required
						/>

						<FormInput
							label="Security Deposit"
							name="securityDeposit"
							type="number"
							value={form.securityDeposit}
							onChange={handleChange}
							placeholder="Enter security deposit"
							required
						/>

						<div className="space-y-1.5">
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700"
							>
								Description
							</label>

							<textarea
								id="description"
								name="description"
								value={form.description}
								onChange={handleChange}
								rows={4}
								placeholder="Enter product description"
								className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
							/>
						</div>
					</div>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold text-gray-900">
						Inventory
					</h3>

					<div className="space-y-1.5">
						<label
							htmlFor="inStock"
							className="block text-sm font-medium text-gray-700"
						>
							Stock Status
						</label>

						<select
							id="inStock"
							name="inStock"
							value={form.inStock}
							onChange={handleChange}
							className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
						>
							<option value="true">In Stock</option>
							<option value="false">Out of Stock</option>
						</select>
					</div>
				</div>

				<div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
					>
						Cancel
					</button>

					<button
						type="button"
						onClick={handleSubmit}
						className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
					>
						Update Product
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default EditProductModal;