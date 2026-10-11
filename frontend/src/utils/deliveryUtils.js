export function handleDelivery(duration) {
	const today = new Date();

	const deliveryStartDate = new Date(today);
	deliveryStartDate.setDate(today.getDate() + 7);

	const deliveryEndDate = new Date(today);
	deliveryEndDate.setDate(today.getDate() + 11);

	const rentalStartDate = deliveryStartDate;
	const rentalEndDate = new Date(rentalStartDate);

	rentalEndDate.setMonth(
		rentalEndDate.getMonth() + duration
	);

	const rentalEndDateMax = new Date(deliveryEndDate);
	rentalEndDateMax.setMonth(
		rentalEndDateMax.getMonth() + duration
	);
	
	return {
		deliveryStartDate: deliveryStartDate.toISOString(),
		deliveryEndDate: deliveryEndDate.toISOString(),
		rentalStartDate: rentalStartDate.toISOString(),
		rentalEndDate: rentalEndDate.toISOString(),
		rentalEndDateMax: rentalEndDateMax.toISOString(),
	};

}

