import { useState } from "react";
import Modal from "./Modal";

const UpdateProfileModal = ({
	isOpen,
	onClose,
	currentUser,
	onSubmit,
}) => {
	const [formData, setFormData] = useState({
		name: currentUser?.full_name || "",
		email: currentUser?.email || "",
		phone: currentUser?.phone || "",
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Update Profile"
		>
			<form
				onSubmit={handleSubmit}
				className="space-y-4"
			>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Full Name"
					className="w-full border rounded-lg p-3"
				/>

				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Email"
					className="w-full border rounded-lg p-3"
				/>

				<input
					type="text"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					placeholder="Phone Number"
					className="w-full border rounded-lg p-3"
				/>

				<div className="flex justify-end gap-3">
					<button
						type="button"
						onClick={onClose}
						className="px-4 py-2 border rounded-lg"
					>
						Cancel
					</button>

					<button
						type="submit"
						className="px-4 py-2 bg-[#43766C] text-white rounded-lg"
					>
						Save Changes
					</button>
				</div>
			</form>
		</Modal>
	);

};

export default UpdateProfileModal;
