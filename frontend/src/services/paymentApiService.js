import axios from "axios";
const API_URL = "http://localhost:3000/api/payments";

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
		console.log('error', error)
		throw (error.response?.data?.message || error.message || "Failed to create checkout session");
	}
};