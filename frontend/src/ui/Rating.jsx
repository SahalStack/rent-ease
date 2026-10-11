const Rating = ({ stars = 0, color = "primary", variant = 'home' }) => {

	const starColor = color === "tertiary" ? "text-tertiary" : "text-primary";
	const alignment = variant === 'home' ? "mb-4" : ""

	return (
		<div className={`flex items-center ${starColor} ${alignment} `}>
			{[1, 2, 3, 4, 5].map((star) => (
				<span
					key={star}
					className="material-symbols-outlined material-filled"
				>
					{stars >= star
						? "star"
						: stars >= star - 0.5
							? "star_half"
							: "star_outline"}
				</span>
			))}
		</div>
	);
};

export default Rating;