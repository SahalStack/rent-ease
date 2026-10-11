import { Link, NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaRegCircleUser } from "react-icons/fa6";
import CustomNavLinks from "./CustomNavLinks"

const Header = () => {

	const { isAuthenticated } = useSelector(
		(state) => state.auth
	);

	const navLinks = [
		{ to: "/", label: "Home" },
		{ to: "/products", label: "Products" },
		{ to: "/categories", label: "Categories" },
		{ to: "/about", label: "About" },
		{ to: "/contact", label: "Contact" },
	]

	return (
		<nav className="sticky top-0 z-50 flex justify-between items-center w-full px-margin-desktop max-w-container-max mx-auto py-4 bg-surface/80 backdrop-blur-md shadow-sm">
			<Link to='/' className="text-headline-sm font-headline-sm font-bold text-primary tracking-tight">RentEase</Link>

			<ul className="hidden md:flex gap-stack-md items-center list-none">
				{navLinks.map(({ to, label }) => (
					<li key={to}>
						<CustomNavLinks to={to} label={label} />
					</li>
				))}
			</ul>

			<div className="flex items-center gap-stack-sm">
				<NavLink
					to="/cart"
					className={({ isActive }) =>
						`p-2 rounded-lg transition-all duration-200 ${isActive
							? "bg-green-100"
							: "hover:bg-surface-container-low"
						}`
					}
				>
					<span className="material-symbols-outlined text-on-surface-variant">
						shopping_cart
					</span>
				</NavLink>
				{isAuthenticated ? (
					<NavLink
						to="/profile"
						className="flex items-center justify-center p-2 rounded-lg hover:bg-surface-container-low transition-colors"
					>
						<FaRegCircleUser
							size={22}
							className="text-primary"
						/>
					</NavLink>
				) : (
					<NavLink
						to="/login"
						className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-label-md hover:opacity-90"
					>
						Login
					</NavLink>
				)}
			</div>
		</nav>
	)
}

export default Header