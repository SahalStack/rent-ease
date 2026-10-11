import api from "./api";

export const fetchAllOrders = async (signal) => {
	const { data } = await api.get("/orders", { signal });
	return data.orders;
};