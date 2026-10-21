import { formatDate } from "../../helper";

const UserRow = ({ user, onEdit, removeUser }) => {

	return (
		<tr className="border-b border-gray-100 hover:bg-gray-50">
			<td className="py-3 px-4 font-medium capitalize">{user?.full_name || "—"}</td>
			<td className="py-3 px-4">{user?.email || "—"}</td>
			<td className="py-3 px-4">{user?.phone ? `+91 ${user.phone}` : "—"}</td>
			<td className="py-3 px-4 uppercase">{user.address?.city || "N/A"}</td>
			<td className="py-3 px-4 capitalize" >
				<span
					className={`
    				px-2 py-1 rounded-full text-xs
    						${user.status === "Active"
							? "bg-green-100 text-green-700"
							: user.status === "Suspended"
								? "bg-yellow-100 text-yellow-700"
								: "bg-red-100 text-red-700"
						}
 					 `}
				>
					{user.status}
				</span>
			</td>

			<td className="py-3 px-4">
				{formatDate(user.createdAt)}
			</td>

			<td className="py-3 px-4">
				<div className="flex gap-3">
					<button
						className="text-blue-600 hover:text-blue-800"
						onClick={() => onEdit(user)}
					>
						<span className="material-symbols-outlined text-lg">
							edit
						</span>
					</button>

					<button
						className="text-red-600 hover:text-red-800"
						onClick={() => removeUser(user._id)}
					>
						<span className="material-symbols-outlined text-lg">
							delete
						</span>
					</button>
				</div>
			</td>
		</tr>
	);
};

export default UserRow;