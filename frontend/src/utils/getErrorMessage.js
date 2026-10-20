export const getErrorMessage = (err) => {
	if (err.response?.data?.message) return err.response.data.message;
	if (err.request) return "Cannot reach server. Check your internet.";
	return "Something went wrong. Try again.";
};