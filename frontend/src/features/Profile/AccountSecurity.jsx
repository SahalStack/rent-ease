import { useSelector } from "react-redux";


const AccountSecurity = ({ handleLogout }) => {

	const { currentUser } = useSelector((state) => state.auth);

	return (
		<section
			className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0px_4px_20px_rgba(67,118,108,0.08)]">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-gutter">
				<div className="space-y-stack-sm">
					<h2 className="font-headline-sm text-headline-sm text-on-surface">Account Security</h2>
					<div className="flex items-center gap-stack-lg">
						<div>
							<p className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
								Account Status
							</p>
							<p className="font-body-md text-body-md text-on-surface flex items-center gap-1">
								<span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
								Active
							</p>
						</div>
						<div>
							<p className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
								Member Since
							</p>
							<p className="font-body-md text-body-md text-on-surface">
								{new Date(currentUser?.createdAt).toLocaleDateString("en-IN", {
									month: "long",
									year: "numeric"
								})}
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row gap-stack-sm">
					<button
						className="px-6 py-2 bg-primary-container text-white font-label-md text-label-md rounded-lg hover:brightness-110 active:scale-95 transition-all">
						Change Password
					</button>
					<button
						className="px-6 py-2 text-error font-label-md text-label-md rounded-lg hover:bg-error-container/10 transition-all"
						onClick={handleLogout}
					>
						Logout
					</button>
				</div>
			</div>
		</section>

	)
}

export default AccountSecurity
