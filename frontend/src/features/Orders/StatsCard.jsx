const StatsCard = ({ title, value, color = "primary" }) => {
	return (
		<div className="bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/20">
			<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
				{title}
			</p>
			<h3 className={`font-headline-md text-headline-md mt-2 text-${color}`}>
				{value}
			</h3>
		</div>
	);
};

export default StatsCard;