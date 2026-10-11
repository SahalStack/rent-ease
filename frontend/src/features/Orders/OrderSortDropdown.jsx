const OrderSortDropdown = ({
	options,
	placeholder,
	value,
	onChange,
	className = "",
}) => {
	return (
		<select
			value={value}
			onChange={onChange}
			className={`flex-1 md:w-48 px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary transition-all outline-none font-body-md text-body-md appearance-none ${className}`}
		>
			<option value="all">{placeholder}</option>

			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

export default OrderSortDropdown;