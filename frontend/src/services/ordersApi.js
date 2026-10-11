import axios from "axios";

const URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeaders = () => {
	const token = localStorage.getItem("token");
	return { Authorization: `Bearer ${token}` };
};

export const fetchOrdersApi = async () => {
	try {
		const { data } = await axios.get(`${URL}/orders`, {
			headers: getAuthHeaders(),
		});
		return data.orders;
	} catch (error) {
		throw error.response?.data?.message || "Failed to fetch orders";
	}
};

export const getOrderById = async (orderId) => {
	try {
		const { data } = await axios.get(`${URL}/orders/${orderId}`,
			{ headers: getAuthHeaders() }
		);
		return data;
	} catch (error) {
		console.error("Get Order By ID Error:", error);
		throw (error.response?.data?.message || error.message || "Failed to fetch order");
	}
};

export const createOrderApi = async (orderData) => {
	try {
		const { data } = await axios.post(`${URL}/orders`, orderData, {
			headers: getAuthHeaders(),
		});
		return data;
	} catch (error) {
		throw error.response?.data?.message || "Failed to create order";
	}
};

export const verifyOrderApi = async (sessionId) => {
	try {
		const { data } = await axios.get(
			`${URL}/payments/verify-session?session_id=${sessionId}`,
			{ headers: getAuthHeaders() }
		);
		return data.order;
	} catch (error) {
		throw error.response?.data?.message || error.message || "Failed to verify order";
	}
};

export const cancelOrderApi = async (orderId) => {
	try {
		const { data } = await axios.delete(
			`${URL}/orders/${orderId}`,
			{ headers: getAuthHeaders() }
		);
		return data;
	} catch (error) {
		throw error.response?.data?.message || "Failed to cancel order";
	}
};