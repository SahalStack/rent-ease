
const AvailabilityOption = ({ value, slug, availability, setAvailability, }) => {
	return (
		<label className="flex items-center gap-3 cursor-pointer group">
			<input
				checked={availability === slug}
				className="accent-primary border-outline-variant"
				name="availability"
				type="radio"
				value={slug}
				onChange={() => setAvailability(slug)}
			/>
			<span
				className="text-body-md font-body-md text-on-surface-variant group-hover:text-primary transition-colors">{value}</span>
		</label>
	)
}

export default AvailabilityOption;
