const CheckOutItemCard = ({ item }) => {

	const itemTotal = item.price * item.quantity * item.duration;

	return (
		<div className="space-y-unit">
			<div className="flex justify-between items-center py-unit border-b border-surface-variant">
				<div>
					<p className="font-body-md text-body-md font-semibold text-on-surface">{item.name} </p>
					<p className="font-caption text-caption text-on-surface-variant">${item.price}/month for {item.duration} Months   x{item.quantity}</p>
				</div>
				<p className="font-body-md text-body-md text-on-surface">${itemTotal}.00</p>
			</div>
		</div>
	)
}

export default CheckOutItemCard
