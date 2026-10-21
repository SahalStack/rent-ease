import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_BASE_URL}/payments`;

export const createCheckoutSession = async (orderData, token) => {
	try {
		const response = await axios.post(
			`${API_URL}/create-checkout-session`,
			orderData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;

	} catch (error) {
		throw (error.response?.data?.message || error.message || "Failed to create checkout session");
	}
};