export const getErrorMessage = (err) => {
	if (!err) return "Something went wrong. Try again.";
	if (typeof err === "string") return err;
	if (err.response?.data?.message) return err.response.data.message;
	if (
		Array.isArray(err.response?.data?.errors) &&
		err.response.data.errors.length > 0 &&
		err.response.data.errors[0]?.msg
	) {
		return err.response.data.errors[0].msg;
	}
	if (err.code === "ECONNABORTED" || err.message?.toLowerCase().includes("timeout")) {
		return "Server is taking longer than expected. Please try again.";
	}
	if (err.message && !err.message.includes("status code") && !err.message.includes("Network Error")) {
		return err.message;
	}
	if (err.request) return "Cannot reach server. Check your internet connection.";
	return err.message || "Something went wrong. Try again.";
};