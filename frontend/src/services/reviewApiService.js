import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/reviews`;

const getAuthHeaders = () => {
	const token = localStorage.getItem("token");
	return { Authorization: `Bearer ${token}` };
};

export const postReview = async (productId, reviewData) => {
	try {
		const response = await axios.post(
			`${API_URL}/${productId}`,
			reviewData,
			{
				headers: getAuthHeaders(),
			}
		);
		return response.data;
	} catch (error) {
		console.log("error", error);
		throw error.response?.data?.message;
	}
};