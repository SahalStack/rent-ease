// services/session.js
const TOKEN_KEY = "adminToken";
const USER_KEY = "adminUser";

export const AUTH_EXPIRED_EVENT = "auth:expired";

const readStorage = (key) => (typeof window === "undefined" ? null : localStorage.getItem(key));

const writeStorage = (key, value) => {
	if (typeof window === "undefined") return;
	if (value) {
		localStorage.setItem(key, value);
	} else {
		localStorage.removeItem(key);
	}
};

export const setAccessToken = (token) => writeStorage(TOKEN_KEY, token);

export const getAccessToken = () => readStorage(TOKEN_KEY);

export const setStoredUser = (user) =>
	writeStorage(USER_KEY, user ? JSON.stringify(user) : null);

export const getStoredUser = () => {
	const stored = readStorage(USER_KEY);
	if (!stored) return null;
	try {
		return JSON.parse(stored);
	} catch {
		return null;
	}
};

export const clearStoredSession = () => {
	writeStorage(TOKEN_KEY, null);
	writeStorage(USER_KEY, null);
};

export const decodeTokenPayload = (token) => {
	if (!token) return null;

	const [, payload] = token.split(".");
	if (!payload) return null;

	try {
		const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
		const padded = base64.padEnd(
			base64.length + ((4 - (base64.length % 4)) % 4),
			"="
		);
		return JSON.parse(atob(padded));
	} catch {
		return null;
	}
};

export const isTokenExpired = (token) => {
	const payload = decodeTokenPayload(token);
	if (!payload?.exp) return false;
	return Date.now() >= payload.exp * 1000;
};

// Only a token that is still usable is sent to the API.
export const getValidAccessToken = () => {
	const token = getAccessToken();
	if (!token || isTokenExpired(token)) return null;
	return token;
};

export const notifyAuthExpired = () => {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new Event(AUTH_EXPIRED_EVENT));
};
