import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/products`;

export const getProducts = async (query = "") => {
	try {
		const response = await axios.get(`${API_URL}?${query}`);
		return response.data.products;
	} catch (error) {
		console.log('error', error)
		throw error.response?.data?.message
	}
};

export const getProductById = async (id) => {
	try {
		const response = await axios.get(`${API_URL}/${id}`);
		return response.data.product;
	} catch (error) {
		console.log('error:::', error)
		throw (
			error.response?.data?.message || error.message || "Failed to fetch product"
		);
	}
};