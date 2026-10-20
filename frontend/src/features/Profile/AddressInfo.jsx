import { useDispatch, useSelector } from "react-redux";
import UpdateAddressModal from './UpdateAddressModal'
import { useState } from "react";
import { updateAddress } from "../auth/authThunk";

const AddressInfo = () => {

	const { currentUser } = useSelector((state) => state.auth);
	const hasAddress = !!currentUser?.address?.fullAddress;

	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<section
			className="bg-surface-container-lowest rounded-xl p-stack-md shadow-[0px_4px_20px_rgba(67,118,108,0.08)] flex flex-col justify-between">

			{!hasAddress ? <AddAddress onOpen={() => setIsModalOpen(true)} /> : <>
				<div>
					<div className="flex justify-between items-start mb-stack-md">
						<h2 className="font-headline-sm text-headline-sm text-on-surface">Address Information</h2>
						<span className="material-symbols-outlined text-outline">home_pin</span>
					</div>
					<div className="space-y-stack-sm">
						<div className="group">
							<p
								className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
								Address</p>
							<p className="font-body-md text-body-md text-on-surface">{currentUser?.address?.fullAddress}</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p
									className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
									City</p>
								<p className="font-body-md text-body-md text-on-surface">{currentUser?.address?.city}</p>
							</div>
							<div>
								<p
									className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
									State</p>
								<p className="font-body-md text-body-md text-on-surface"> {currentUser?.address?.state}</p>
							</div>
						</div>
						<div>
							<p
								className="font-caption text-caption text-on-surface-variant uppercase tracking-widest">
								Postal Code</p>
							<p className="font-body-md text-body-md text-on-surface">  {currentUser?.address?.postalCode}</p>
						</div>
					</div>
				</div>
				<button
					onClick={() => setIsModalOpen(true)}
					className="mt-stack-lg w-full md:w-max px-6 py-2 border-1.5 border-primary-container text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-all"
					style={{ borderWidth: "1.5px" }}
				>
					Update Address
				</button>
			</>}

			<UpdateAddressModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				currentUser={currentUser}
				onSubmit={async (data) => {
					await dispatch(updateAddress(data));
					setIsModalOpen(false);
				}}
			/>
		</section>
	)
}

export default AddressInfo


const AddAddress = ({ onOpen }) => {
	return (
		<div className="flex flex-col items-center justify-center gap-stack-md py-stack-xl text-center">

			<span className="material-symbols-outlined text-5xl text-outline-variant">
				home_pin
			</span>

			<div className="space-y-1">
				<p className="font-title-sm text-title-sm text-on-surface">No address added yet</p>
				<p className="font-body-sm text-body-sm text-on-surface-variant">
					Add a delivery address to get started
				</p>
			</div>

			<button className="flex items-center gap-2 px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 active:scale-95 transition-all"
				onClick={onOpen}>
				<span className="material-symbols-outlined text-base"
				>add_location_alt</span>
				Add Address
			</button>

		</div>
	);
};