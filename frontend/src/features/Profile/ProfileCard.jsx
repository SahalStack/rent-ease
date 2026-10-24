import { useSelector } from "react-redux"

const ProfileCard = () => {
	const { currentUser } = useSelector((state) => state.auth);
	if (!currentUser) return null;

	const avatarSrc = currentUser.avatar || currentUser.profileImage || currentUser.photo || "/images/defualt-avatar.png";

	return (
		<div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0px_4px_20px_rgba(67,118,108,0.08)] text-center">
			<div className="relative w-24 h-24 mx-auto mb-stack-sm">
				<img
					alt="Profile Avatar"
					className="w-full h-full rounded-full object-cover border-4 border-surface-container"
					src={avatarSrc}
					onError={(e) => {
						e.target.src = "/images/defualt-avatar.png";
					}}
				/>
			</div>
			<h3 className="font-headline-sm text-headline-sm text-on-surface">{currentUser.full_name}</h3>
			<p className="font-caption text-caption text-on-surface-variant">{currentUser.email}</p>
			<p className="font-caption text-caption text-secondary mt-2">Member Since:{new Date(currentUser.createdAt).toLocaleDateString("en-US", {
				month: "short",
				year: "numeric",
			})}
			</p>
		</div>
	)
}

export default ProfileCard
