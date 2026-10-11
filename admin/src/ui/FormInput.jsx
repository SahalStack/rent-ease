const FormInput = ({
	label,
	name,
	type = "text",
	value,
	onChange,
	placeholder,
	error,
	required = false,
	disabled = false,
}) => {
	return (
		<div className="space-y-1.5">
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{label}
				{required && (
					<span className="ml-1 text-red-500">*</span>
				)}
			</label>

			<input
				id={name}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				className={`
          w-full rounded-lg border px-3 py-2.5
          text-sm text-gray-900 outline-none
          transition

          ${error
						? "border-red-500 focus:ring-2 focus:ring-red-100"
						: "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
					}

          disabled:cursor-not-allowed
          disabled:bg-gray-100
          disabled:text-gray-500
        `}
			/>

			{error && (
				<p className="text-xs text-red-500">
					{error}
				</p>
			)}
		</div>
	);
};

export default FormInput;