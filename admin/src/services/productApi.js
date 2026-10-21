import api from "./api";

export const fetchAllProducts = async (signal) => {
	const { data } = await api.get("/products", { signal });
	return data.products;
};

export const addProduct = async (formData) => {
	const { data } = await api.post("/products", formData);
	return data.product;
};

export const updateProduct = async (id, formData) => {
	const { data } = await api.put(`/products/${id}`, formData);
	return data.product;
};