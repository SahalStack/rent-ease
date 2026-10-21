import { useState } from "react";
import { toast } from "react-hot-toast";
import ImageUploadBox from "../../ui/ImageUploadBox";
import InputBox from "../../ui/InputBox";
import { addProduct } from "../../services/productApi";

const initialFormData = {
	name: "",
	description: "",
	category: "furniture",
	price: "",
	securityDeposit: "",
	inStock: true,
}

const AddProductForm = () => {
	const [formData, setFormData] = useState(initialFormData);
	const [mainImage, setMainImage] = useState(null);
	const [extraImages, setExtraImages] = useState([null, null, null, null]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleExtraImage = (index, file) => {
		const updated = [...extraImages];
		updated[index] = file;
		setExtraImages(updated);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("name", formData.name);
		data.append("description", formData.description);
		data.append("category", formData.category);
		data.append("price", formData.price);
		data.append("securityDeposit", formData.securityDeposit);
		data.append("inStock", formData.inStock);
		data.append("image", mainImage);

		extraImages.forEach((img) => {
			if (img) data.append("extraImages", img);
		});

		try {
			// eslint-disable-next-line no-unused-vars
			const product = await addProduct(data);
			setFormData(initialFormData);
			setMainImage(null);
			setExtraImages([null, null, null, null]);
			toast.success("Product added successfully!");
		} catch (err) {
			toast.error(err.response?.data?.message || err.message || "Failed to add product");
		}
	};

	return (
		<>
			<div className="text-center mb-6">
				<h1 className="text-2xl font-bold">Add Product</h1>
				<p className="text-sm text-gray-500">Fill details to add a new product</p>
			</div>
			<form onSubmit={handleSubmit}
				className="max-w-2xl mx-auto space-y-5 p-6 border border-gray-300 rounded-xl"
			>
				<InputBox
					label="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					type="text"

				/>

				<InputBox
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					type="textarea"

				/>

				<div className="grid grid-cols-2 gap-4">
					<InputBox
						label="Price"
						name="price"
						value={formData.price}
						onChange={handleChange}
						type="number"

					/>
					<InputBox
						label="Security Deposit"
						name="securityDeposit"
						value={formData.securityDeposit}
						onChange={handleChange}
						type="number"

					/>
				</div>

				<div>
					<label className="text-sm font-medium">Category</label>
					<select
						name="category"
						value={formData.category}
						onChange={handleChange}
						className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
					>
						<option value="furniture">Furniture</option>
						<option value="bedroom">Bedroom</option>
						<option value="dining">Dining</option>
						<option value="office">Office</option>
						<option value="appliances">Appliances</option>
						<option value="electronics">Electronics</option>
					</select>
				</div>

				<div>
					<label className="text-sm font-medium">Main Image</label>
					<div className="mt-1">
						<ImageUploadBox
							id="mainImageInput"
							image={mainImage}
							onChange={(file) => setMainImage(file)}
							onRemove={() => setMainImage(null)}

						/>
					</div>
				</div>

				<div>
					<label className="text-sm font-medium">Extra Images (4)</label>
					<div className="grid grid-cols-4 gap-3 mt-2">
						{extraImages.map((img, index) => (
							<ImageUploadBox
								key={index}
								id={`extraImageInput-${index}`}
								image={img}
								onChange={(file) => handleExtraImage(index, file)}
								onRemove={() => handleExtraImage(index, null)}
							/>
						))}
					</div>
				</div>

				<button
					type="submit"
					className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
				>
					Add Product
				</button>
			</form>
		</>

	);
};

export default AddProductForm;