
const RentalDurationCard = ({ duration, isSelected, onSelect }) => {
	return (
		<label className="cursor-pointer group" onClick={onSelect}>
			<input
				checked={isSelected}
				onChange={() => { }}
				className="hidden peer"
				name="duration"
				type="radio"
			/>
			<div className="text-center py-3 rounded-lg border border-outline-variant peer-checked:border-primary peer-checked:bg-primary-container/10 peer-checked:text-primary transition-all font-medium">
				{duration.value} Mo
			</div>
		</label>
	);
};

export default RentalDurationCard;