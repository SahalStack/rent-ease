const DeliveryInfoCard = ({
	deliveryStart,
	deliveryEnd,
	rentalEnd
}) => {
	const rows = [
		{ label: "Estimated Delivery", value: `${deliveryStart} – ${deliveryEnd}` },
		{ label: "Rental Starts", value: "On delivery date" },
		{ label: "Estimated Rental End", value: `${rentalEnd}` },
	];

	return (
		<div className="bg-white rounded-2xl px-6 py-6 shadow-sm border border-gray-100">
			{rows.map((row, index) => (
				<div
					key={index}
					className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 ${
						index !== rows.length - 1 ? "border-b border-gray-100" : ""
					}`}
				>
					<span className="text-xs font-semibold uppercase tracking-widest text-on-secondary-fixed">
						{row.label}
					</span>
					<span className="text-sm text-gray-800 sm:text-right">
						{row.value}
					</span>
				</div>
			))}
		</div>
	);
};

export default DeliveryInfoCard