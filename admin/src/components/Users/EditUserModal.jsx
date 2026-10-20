import { useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";

const EditUserModal = ({ isOpen, user, onClose, refreshUsers, changeUserStatus }) => {

	const [form, setForm] = useState({
		name: user?.full_name || "",
		email: user?.email || "",
		phone: user?.phone || "",
		role: user?.role || "user",
		status: user?.status || "Active",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await changeUserStatus(user._id, form.status);
			await refreshUsers();
			onClose();
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Manage User"
			description="View user information and manage account access."
			size="lg"
		>
			<div className="space-y-6">
				<div>
					<h3 className="mb-4 text-sm font-semibold text-gray-900">User Information</h3>
					<div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
						<div>
							<p className="text-xs font-medium text-gray-500">Full Name	</p>
							<p className="mt-1 text-sm font-medium text-gray-900">{user?.full_name || "N/A"}</p>
						</div>

						<div>
							<p className="text-xs font-medium text-gray-500">Email Address	</p>
							<p className="mt-1 text-sm text-gray-900">{user?.email || "N/A"}</p>
						</div>

						<div>
							<p className="text-xs font-medium text-gray-500">Phone Number</p>
							<p className="mt-1 text-sm text-gray-900">{user?.phone || "N/A"}</p>
						</div>

					</div>
				</div>

				<div>
					<h3 className="mb-4 text-sm font-semibold text-gray-900">Account Management</h3>
					<div className="space-y-1.5">
						<label
							htmlFor="status"
							className="block text-sm font-medium text-gray-700"
						>
							Account Status
						</label>

						<select
							id="status"
							name="status"
							value={form.status}
							onChange={handleChange}
							className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
						>
							<option value="Active">Active</option>
							<option value="Suspended">Suspended</option>
							<option value="Blocked">Blocked</option>
						</select>
					</div>
				</div>

				<div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
					<button
						type="button"
						onClick={onClose}
						className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
					>
						Cancel
					</button>

					<button
						type="button"
						onClick={handleSubmit}
						className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
					>
						Update Status
					</button>
				</div>

			</div>
		</Modal>
	)
}

export default EditUserModal
