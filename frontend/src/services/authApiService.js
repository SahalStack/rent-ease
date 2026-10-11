import api from "./api";
import toast from "react-hot-toast";

const API_URL = "http://localhost:3000/api";

export async function loginUser(credentials) {
	try {
		const { data } = await api.post(`${API_URL}/auth/login`, credentials);
		return data;
	} catch (error) {
		const message = error.response?.data?.message || "Invalid email or password";
		console.log('error::::', error.response?.data?.message)
		throw new Error(message, { cause: error });
	}
}

export async function registerUser(userData) {
	try {
		const { data } = await api.post(
			`${API_URL}/auth/register`,
			userData
		);
		return data;
	} catch (error) {
		console.log('API error:', error.response.data);
		toast.error(error.response.data.message)
		const message = error.response?.data?.message || "Registration failed";
		throw new Error(message, { cause: error });
	}
}

export async function updateProfileApi(userData) {
	try {
		const { data } = await api.put("/auth/profile", userData);
		return data;
	} catch (error) {
		const message = error.response?.data?.message || "Profile update failed";
		throw new Error(message, { cause: error });
	}
}

export async function updateAddressApi(addressData) {
	try {
		const { data } = await api.put("/auth/address", addressData);
		return data;
	} catch (error) {
		const message = error.response?.data?.message || "Address update failed";
		throw new Error(message, { cause: error });
	}
}
