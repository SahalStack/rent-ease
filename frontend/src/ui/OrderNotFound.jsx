const OrderNotFound = () => {
	return (
		<div className="w-full flex flex-col items-center justify-center py-20">
			<span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
				receipt_long
			</span>

			<p className="text-headline-sm font-headline-sm text-on-surface-variant">
				Order Not Found
			</p>

			<p className="text-body-md text-outline mt-2 text-center max-w-md">
				We couldn't find the order you're looking for. It may have been removed,
				or the order ID may be invalid.
			</p>
		</div>
	)
}

export default OrderNotFound
