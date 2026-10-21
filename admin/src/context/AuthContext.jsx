import { useEffect, useState } from "react";
import api from "../services/api";
import { AuthContext } from "./authContext";
import {
	AUTH_EXPIRED_EVENT,
	clearStoredSession,
	getAccessToken,
	getStoredUser,
	getValidAccessToken,
	setAccessToken,
	setStoredUser,
} from "../services/session";

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => getStoredUser());
	const [token, setToken] = useState(() => getAccessToken());
	const [loading, setLoading] = useState(true);

	// A 401 from the API ends the session and sends the admin back to the login page.
	useEffect(() => {
		const handleExpired = () => {
			setUser(null);
			setToken(null);
		};
		window.addEventListener(AUTH_EXPIRED_EVENT, handleExpired);
		return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleExpired);
	}, []);

	// On page refresh the stored session is reused, the refresh cookie is the fallback.
	useEffect(() => {
		const restore = async () => {
			if (getValidAccessToken()) {
				setLoading(false);
				return;
			}

			clearStoredSession();

			try {
				const { data } = await api.post("/auth/refresh");
				if (data.user?.role === "admin") {
					setAccessToken(data.accessToken);
					setStoredUser(data.user);
					setUser(data.user);
					setToken(data.accessToken);
				}
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		restore();
	}, []);

	const login = (user, accessToken) => {
		setAccessToken(accessToken);
		setStoredUser(user);
		setUser(user);
		setToken(accessToken);
	};

	const logout = () => {
		clearStoredSession();
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
