import api from "./api";

export const fetchDashboardSummary = async (signal) => {
	const { data } = await api.get("/dashboard/summary", { signal });
	return data;
};