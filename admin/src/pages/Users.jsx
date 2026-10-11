import UsersTable from "../components/Users/UsersTable"
import EditUserModal from "../components/Users/EditUserModal";
import useUsers from "../hooks/useUsers";

const Users = () => {
	const {
		changeUserStatus,
		refreshUsers,
		users,
		loading,
		error,
		isEditOpen,
		selectedUser,
		handleEditUser,
		handleCloseModal,
		removeUser
	} = useUsers();

	return (
		<div>
			<UsersTable onEdit={handleEditUser}
				users={users}
				loading={loading}
				error={error}
				removeUser={removeUser}
			/>

			{isEditOpen && (
				<EditUserModal
					changeUserStatus={changeUserStatus}
					refreshUsers={refreshUsers}
					isOpen={isEditOpen}
					onClose={handleCloseModal}
					user={selectedUser}
				/>)}
		</div>
	)
}

export default Users
