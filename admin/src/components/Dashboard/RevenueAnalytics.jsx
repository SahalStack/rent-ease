import { BarChart } from "@mui/x-charts/BarChart";
import { Card, CardContent, CardHeader } from "@mui/material";

const monthlyRevenue = [
	{ month: "Jan", revenue: 12500 },
	{ month: "Feb", revenue: 18200 },
	{ month: "Mar", revenue: 15800 },
	{ month: "Apr", revenue: 24600 },
	{ month: "May", revenue: 28900 },
	{ month: "Jun", revenue: 31200 },
	{ month: "Jul", revenue: 27500 },
	{ month: "Aug", revenue: 34800 },
	{ month: "Sep", revenue: 39100 },
	{ month: "Oct", revenue: 42500 },
	{ month: "Nov", revenue: 46300 },
	{ month: "Dec", revenue: 51800 },
];

export default function RevenueAnalytics() {

	const months = monthlyRevenue.map(item => item.month);
	const revenueData = monthlyRevenue.map(item => item.revenue);

	return (
		<div className="mb-10" style={{ minWidth: 500 }}>
			<Card>
				<CardHeader
					title="Revenue Analytics"
					subheader="Monthly revenue trend for the current year"
				/>

				<CardContent>
					<BarChart
						height={350}
						margin={{ bottom: 50 }}
						xAxis={[
							{
								data: months,
								scaleType: "band",
							},
						]}
						yAxis={[
							{
								label: "Revenue (₹)",
							},
						]}
						series={[
							{
								data: revenueData,
								label: "Revenue",
								color: '#25272b',
							},
						]}
					/>
				</CardContent>
			</Card>
		</div>

	);
}