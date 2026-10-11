import { NavLink } from "react-router-dom";
import { navLinks } from "../helper";
import Navlinks from "./Navlinks";

const Sidebar = () => {
	return (
		<>
			<aside className='fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 flex flex-col'
			>
				<div className="px-6 py-6 flex items-center gap-3">
					<span className="material-symbols-outlined text-blue-600 text-3xl">home_app_logo</span>
					<h1 className="text-xl font-bold tracking-tight">RentEase</h1>
				</div>

				<nav className="flex-1 px-4 py-2 space-y-2">
					{navLinks.map((link) => {
						return (
							<Navlinks
								key={link.id}
								to={link.to}
								icon={link.icon}
								label={link.label}
							/>
						)
					})}
				</nav>

				<div className="p-4 border-t border-gray-200">
					<NavLink className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 text-sm font-medium" >
						<span className="material-symbols-outlined">logout</span>
						Logout
					</NavLink>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;