import api from "./api";

export const fetchOrdersApi = async () => {
	try {
		const { data } = await api.get("/orders");
		return data.orders;
	} catch (error) {
		throw error.response?.data?.message || "Failed to fetch orders";
	}
};

export const getOrderById = async (orderId) => {
	try {
		const { data } = await api.get(`/orders/${orderId}`);
		return data.order;
	} catch (error) {
		throw error.response?.data?.message || "Failed to fetch order";
	}
};

export const createOrderApi = async (orderData) => {
	try {
		const { data } = await api.post("/orders", orderData);
		return data;
	} catch (error) {
		throw error.response?.data?.message || "Failed to create order";
	}
};

export const verifyOrderApi = async (sessionId) => {
	try {
		const { data } = await api.get(
			`/payments/verify-session?session_id=${sessionId}`
		);
		return data.order;
	} catch (error) {
		throw error.response?.data?.message || "Failed to verify order";
	}
};

export const cancelOrderApi = async (orderId) => {
	try {
		const { data } = await api.delete(`/orders/${orderId}`);
		return data;
	} catch (error) {
		throw error.response?.data?.message || "Failed to cancel order";
	}
};
