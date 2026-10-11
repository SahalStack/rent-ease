function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
	return (
		<div className="flex items-center border border-outline-variant rounded-lg px-2">
			<button
				className="p-2 text-on-surface-variant"
				onClick={() => onChange(Math.max(min, value - 1))}
				disabled={value <= min}
			>
				<span className="material-symbols-outlined text-[20px]">remove</span>
			</button>

			<span className="px-4 font-medium">{value}</span>

			<button
				className="p-2 text-on-surface-variant"
				onClick={() => onChange(Math.min(max, value + 1))}
				disabled={value >= max}
			>
				<span className="material-symbols-outlined text-[20px]">add</span>
			</button>
		</div>
	);
}

export default QuantitySelector;