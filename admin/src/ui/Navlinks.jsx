import { NavLink } from "react-router-dom"

const Navlinks = ({ to, icon, label }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? "sidebar-active" : "text-gray-600 hover:bg-gray-100"
				}`
			}
			to={to}>
			<span className="material-symbols-outlined">{icon}</span>
			{label}
		</NavLink>
	)
}

export default Navlinks
