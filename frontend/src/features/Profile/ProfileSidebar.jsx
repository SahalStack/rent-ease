import { useState } from "react";
import { profileNavItems } from "../../../data"
import ProfileCard from "./ProfileCard"
import ProfileNavItem from "./ProfileNavItem";

const ProfileSidebar = () => {

	// eslint-disable-next-line no-unused-vars
	const [active, setActive] = useState("Profile");

	return (
		<aside className="lg:col-span-3 space-y-gutter">
			<ProfileCard />
			<nav
				className="bg-surface-container-lowest rounded-xl py-stack-sm shadow-[0px_4px_20px_rgba(67,118,108,0.08)]">
				<ul className="space-y-1">
					{profileNavItems.map((item) => (
						<ProfileNavItem
							key={item.label}
							icon={item.icon}
							label={item.label}
							isActive={active === item.label}
							to={item.to}
						/>
					))}
				</ul>
			</nav>
		</aside>
	)
}

export default ProfileSidebar
