import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { setAccessToken } from "../services/api";

const API = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	// On page refresh, ask the server for a new access token
	useEffect(() => {
		const restore = async () => {
			try {
				const { data } = await axios.post(
					`${API}/auth/refresh`, {}, { withCredentials: true }
				);
				if (data.user?.role === "admin") {
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
		setUser(user);
		setToken(accessToken);
	};

	const logout = () => {
		setAccessToken(null);
		setUser(null);
		setToken(null);
	};

	return (
		<AuthContext.Provider value={{ user, token, loading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);