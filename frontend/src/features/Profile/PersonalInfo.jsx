import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateProfileModal from "./UpdateProfileModal";
import { updateProfile } from "../auth/authThunk";

const PersonalInfo = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const dispatch = useDispatch();

	// The session can end while the page is open, currentUser is then null.
	if (!currentUser) return null;

	return (
		<section
			className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0px_4px_20px_rgba(67,118,108,0.08)] flex flex-col justify-between">
			<div>
				<div className="flex justify-between items-start mb-stack-md">
					<h2 className="font-headline-sm text-headline-sm text-on-surface">Personal Information</h2>
					<span className="material-symbols-outlined text-outline"
					>edit_note</span>
				</div>
				<div className="space-y-stack-sm">
					<div className="group">
						<p
							className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
							Full Name</p>
						<p className="font-body-md text-body-md text-on-surface">{currentUser.full_name}</p>
					</div>
					<div className="group">
						<p
							className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
							Email Address</p>
						<p className="font-body-md text-body-md text-on-surface">{currentUser.email}</p>
					</div>
					<div className="group">
						<p
							className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
							Phone Number</p>
						<p className="font-body-md text-body-md text-on-surface">{currentUser.phone}</p>
					</div>
				</div>
			</div>
			<button
				className="mt-stack-lg w-full md:w-max px-6 py-2 bg-primary-container text-white font-label-md text-label-md rounded-lg hover:brightness-110 active:scale-95 transition-all"
				onClick={() => setIsModalOpen(true)}
			>
				Edit Profile
			</button>

			<UpdateProfileModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				currentUser={currentUser}
				onSubmit={(data) => {
					dispatch(updateProfile(data));
					setIsModalOpen(false);
				}}
			/>
		</section>
	)
}

export default PersonalInfo
