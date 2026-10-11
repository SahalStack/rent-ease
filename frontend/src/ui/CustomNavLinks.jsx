import { NavLink } from "react-router-dom"

const CustomNavLinks = ({ to, label, onClick }) => {

	const baseStyle = 'text-label-md font-label-md';

	const activeClass = baseStyle + 'text-primary border-b-2 border-primary pb-1 relative px-2 py-1 text-body-md transition-all duration-300';
	const inactiveClass = baseStyle + 'text-on-surface-variant hover:text-primary transition-colors';

	return (
		<NavLink to={to}
			onClick={onClick}
			className={({ isActive }) =>
				isActive ? activeClass : inactiveClass
			}>
			{label}
		</NavLink>
	)
}

export default CustomNavLinks
