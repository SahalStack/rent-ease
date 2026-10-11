import api from "./api";

export async function loginUser(credentials) {
	try {
		const { data } = await api.post("/auth/login", credentials);
		return data;
	} catch (error) {
		const message =
			error.response?.data?.message || error.message || "Login failed";
		throw new Error(message, { cause: error });
	}
}

export async function registerUser(userData) {
	try {
		const { data } = await api.post("/auth/register", userData);
		return data;
	} catch (error) {
		const message =
			error.response?.data?.message || error.message || "Registration failed";
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
