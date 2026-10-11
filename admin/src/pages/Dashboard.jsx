import { useEffect, useState } from "react";
import { fetchDashboardSummary } from "../services/dashboardApi";
import StatsCard from "../components/Dashboard/StatsCard";
import RevenueAnalytics from '../components/Dashboard/RevenueAnalytics'
import Spinner from "../ui/Spinner";
import ErrorMessage from "../ui/ErrorMessage";
import LowStockProducts from "../components/Dashboard/LowStockProducts";

const Dashboard = () => {

	const [summary, setSummary] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSummary = async () => {
			try {
				setLoading(true);
				const data = await fetchDashboardSummary();
				setSummary(data);
			} catch (err) {
				setError(`Failed to load Orders: ${err.message}`);
			} finally {
				setLoading(false);
			}
		};
		fetchSummary();
	}, []);

	if (loading) return <Spinner label="stats" />;
	if (error) return <ErrorMessage message={error} />;
	if (!summary || Object.keys(summary).length === 0) {
		return <p className="text-center py-10 text-gray-500">No stats found</p>;
	}

	return (
		<div>
			<StatsCard summary={summary} />
			<RevenueAnalytics />
			<LowStockProducts />
		</div>
	)
}

export default Dashboard
