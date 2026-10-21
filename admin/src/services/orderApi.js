import api from "./api";

export const fetchAllOrders = async (signal) => {
	const { data } = await api.get("/admin/orders", { signal });
	return data.orders;
};