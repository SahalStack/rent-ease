
const InputBox = ({ label, name, type, value, onChange }) => {
	return (
		<div>
			<label className="text-sm font-medium">{label}</label>
			{type === "textarea" ? (
				<textarea
					name={name}
					value={value}
					onChange={onChange}
					className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 h-24"
					required
				/>
			) : (
				<input
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
					required
				/>
			)}
		</div>
	)
}

export default InputBox
