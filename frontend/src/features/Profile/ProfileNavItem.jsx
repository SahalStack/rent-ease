import { Link } from "react-router-dom";

function ProfileNavItem({ icon, label, to, isActive }) {
	const base = "flex items-center gap-3 px-stack-md py-3  font-label-md text-label-md transition-all";

	const active = "text-primary active-nav-border bg-surface-container-low";

	const idle = "text-on-surface-variant hover:bg-surface-container-low hover:text-primary";

	return (
		<li>
			<Link className={`${base} ${isActive ? active : idle}`}
				to={to}>
				<span className="material-symbols-outlined"
					data-weight={isActive ? "fill" : undefined}>
					{icon}
				</span>
				{label}
			</Link>
		</li>
	);
}

export default ProfileNavItem;