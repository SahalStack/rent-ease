import { useSelector } from "react-redux"

const ProfileCard = () => {
	const { currentUser } = useSelector((state) => state.auth);

	return (
		<div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0px_4px_20px_rgba(67,118,108,0.08)] text-center">
			<div className="relative w-24 h-24 mx-auto mb-stack-sm">
				<img alt="Profile Avatar"
					className="w-full h-full rounded-full object-cover border-4 border-surface-container"
					data-alt="A professional headshot of a stylish middle-aged man with a friendly smile, clean-shaven, wearing a high-quality beige linen shirt. The background is a soft-focus minimalist interior with warm, natural sunlight streaming in, perfectly aligning with a quiet luxury and premium furniture rental brand aesthetic."
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHXzbhaKTSgz33BaO3RV6pDNUYhyroaGqF4KbMkgydNZbAIMzQ2QQOv4WuwjVrIX-cOapZZ19RdsribuOWgDZgeCRACJ84YgMJRhU8zSGY03c1_YhCxvq-EnAUNOWQd9LtUla3zJGI60Rlxom4b3eiJywSTBptugZh0qdS3mduUiplNtodeODHy7NHsL2-YAO-7QdDnfWHPT1TaW7mX0QnwSY7vuFQqRIPopAcLddBQ-4OUaJVUlApW61NWxf9e72QrfKzp45G_Q" />
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
