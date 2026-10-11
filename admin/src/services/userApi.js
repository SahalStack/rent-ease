import api from "./api";

export const fetchAllUsers = async (signal) => {
	const { data } = await api.get("/dashboard/users", { signal });
	return data;
};

export const updateUser = async (userId, status) => {
	const { data } = await api.patch(`/dashboard/users/${userId}`, { status });
	return data;
};

export const deleteUser = async (userId) => {
	const { data } = await api.delete(`/dashboard/users/${userId}`);
	return data;
};