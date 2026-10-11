import renderStatus from '../../utils/RenderStatus.jsx';
import UserRow from './UserRow.jsx';

const UsersTable = ({ onEdit, users, loading, error, removeUser }) => {

	const status = renderStatus(loading, error, users.length === 0, "users");
	if (status) return status;

	return (
		<div className="border border-gray-300 rounded-lg overflow-hidden">
			<table className="w-full text-sm text-left border-collapse">
				<thead>
					<tr className="border-b border-gray-200 text-gray-500">
						<th className="py-3 px-4">Name</th>
						<th className="py-3 px-4">Email</th>
						<th className="py-3 px-4">Phone</th>
						<th className="py-3 px-4">City</th>
						<th className="py-3 px-4">Status</th>
						<th className="py-3 px-4">Joined Date</th>
						<th className="py-3 px-4">Edit</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<UserRow
							key={user._id}
							user={user}
							onEdit={onEdit}
							removeUser={removeUser}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default UsersTable
