import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { deleteUser, fetchAllUsers, updateUser } from "../services/userApi";

const useUser = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const [isEditOpen, setIsEditOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const handleEditUser = (user) => {
		setSelectedUser(user);
		setIsEditOpen(true);
	}

	const handleCloseModal = () => {
		setIsEditOpen(false);
		setSelectedUser(null);
	}

	useEffect(() => {
		const controller = new AbortController();
		const getUsers = async () => {
			try {
				setLoading(true);
				const data = await fetchAllUsers();
				setUsers(data.users);
			} catch (error) {
				setError(`Failed to load users: ${error.message}`);
			} finally {
				setLoading(false);
			}
		}
		getUsers();
		return () => controller.abort();
	}, []);

	const refreshUsers = async () => {
		const data = await fetchAllUsers();
		setUsers(data);
	};

	const changeUserStatus = async (id, status) => {
		try {
			const response = await updateUser(id, status);
			await refreshUsers();
			toast.success(response.message);
			return response;
		} catch (error) {
			console.error("Update user failed:", error.response?.data?.message || error.message);
			toast.error(error.response?.data?.message);
		}
	};

	const removeUser = async (userId) => {
		try {
			const response = await deleteUser(userId);
			setUsers((prevUsers) =>
				prevUsers.filter((user) => user._id !== userId)
			);
			toast.success(response.message);
		} catch (error) {
			console.error("Delete user failed:", error.response?.data?.message || error.message);
			toast.error(error.response?.data?.message);
		}
	}

	return {
		users,
		loading,
		error,
		isEditOpen,
		selectedUser,
		handleEditUser,
		handleCloseModal,
		changeUserStatus,
		refreshUsers,
		removeUser,
	};

}

export default useUser;