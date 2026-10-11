import { useState } from "react";
import Modal from "./Modal";

const UpdateAddressModal = ({ isOpen, onClose, currentUser, onSubmit }) => {

	const [formData, setFormData] = useState({
		fullAddress: currentUser?.address?.fullAddress || "",
		city: currentUser?.address?.city || "",
		state: currentUser?.address?.state || "",
		postalCode: currentUser?.address?.postalCode || "",
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
		<Modal isOpen={isOpen} onClose={onClose} title="Add Address">
			<form onSubmit={handleSubmit} className="space-y-4">

				<input
					type="text"
					name="fullAddress"
					value={formData.fullAddress}
					onChange={handleChange}
					placeholder="Full Address (e.g. 123 Maple Avenue, Apt 4B)"
					className="w-full border rounded-lg p-3"
				/>

				<div className="grid grid-cols-2 gap-3">
					<input
						type="text"
						name="city"
						value={formData.city}
						onChange={handleChange}
						placeholder="City"
						className="w-full border rounded-lg p-3"
					/>
					<input
						type="text"
						name="state"
						value={formData.state}
						onChange={handleChange}
						placeholder="State"
						className="w-full border rounded-lg p-3"
					/>
				</div>

				<input
					type="number"
					name="postalCode"
					value={formData.postalCode}
					onChange={handleChange}
					placeholder="Postal Code"
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
						Save Address
					</button>
				</div>

			</form>
		</Modal>
	);
};

export default UpdateAddressModal;