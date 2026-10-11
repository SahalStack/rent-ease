import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageHeader from "./PageHeader";

const AppLayout = () => {
	return (
		<div className="flex min-h-screen bg-gray-50">
			<Sidebar />

			<div className="flex min-w-0 flex-1 flex-col md:ml-64">
				<PageHeader />

				<main className="flex-1 overflow-x-hidden p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default AppLayout;