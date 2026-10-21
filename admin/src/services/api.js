import axios from "axios";
import {
	clearStoredSession,
	getValidAccessToken,
	notifyAuthExpired,
} from "./session";

const api = axios.create({
	baseURL: import.meta.env.VITE_SERVER_URL,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const token = getValidAccessToken();
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error.response?.status;
		const url = error.config?.url || "";

		// A failed login stays on the login page, every other 401 ends the session.
		if (status === 401 && !url.includes("/auth/login")) {
			clearStoredSession();
			notifyAuthExpired();
		}
		return Promise.reject(error);
	}
);

export default api;
