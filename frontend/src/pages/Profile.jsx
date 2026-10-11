import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddressInfo from "../features/Profile/AddressInfo"
import PersonalInfo from "../features/Profile/PersonalInfo"
import ProfileSidebar from "../features/Profile/ProfileSidebar"

import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";
import usePageTitle from "../hooks/usePageTitle";
import AccountSecurity from "../features/Profile/AccountSecurity";

const Profile = () => {
	usePageTitle('Profile');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(logout());
		toast.success("Logged out successfully");
		navigate("/login");
	};

	return (
		<main className="max-w-container-max mx-auto px-margin-desktop py-section-padding animate-fadeUp">
			<header className="mb-stack-lg">
				<h1 className="font-display-lg text-display-lg text-on-surface mb-2">My Profile</h1>
				<p className="font-body-lg text-body-lg text-on-surface-variant">Manage your personal information and rental
					preferences.</p>
			</header>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
				<ProfileSidebar />
				<div className="lg:col-span-9 space-y-gutter">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
						<PersonalInfo />
						<AddressInfo />
					</div>

					<AccountSecurity handleLogout={handleLogout} />

				</div>
			</div>
		</main>
	)
}

export default Profile
