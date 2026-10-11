import axios from "axios";

export const fetchAllProducts = async (signal) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`, { signal });
		const data = await response.json();
		return data.products;
	} catch (err) {
		console.error("Error fetching products:", err);
		throw err;
	}
}

export const addProduct = async (formData) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/products`,
			formData
		);

		return response.data.product;
	} catch (err) {
		console.error("Error adding product:", err);
		throw err;
	}
};

export const updateProduct = async (id, formData) => {
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
			formData
		);

		return response.data.product;
	} catch (err) {
		console.error("Error updating product data:", err);
		throw err;
	}
};

