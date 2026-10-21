import api from "./api";

export const fetchAllProducts = async (signal) => {
	try {
		const { data } = await api.get("/products", { signal });
		return data.products;
	} catch (err) {
		throw err;
	}
};

export const addProduct = async (formData) => {
	try {
		const { data } = await api.post("/products", formData);
		return data.product;
	} catch (err) {
		throw err;
	}
};

export const updateProduct = async (id, formData) => {
	try {
		const { data } = await api.put(`/products/${id}`, formData);
		return data.product;
	} catch (err) {
		throw err;
	}
};