// services/authToken.js
let accessToken =
	typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const setAccessToken = (t) => {
	accessToken = t;
	if (typeof window !== "undefined") {
		if (t) {
			localStorage.setItem("token", t);
		} else {
			localStorage.removeItem("token");
		}
	}
};

export const getAccessToken = () => {
	return (
		accessToken ||
		(typeof window !== "undefined" ? localStorage.getItem("token") : null)
	);
};
