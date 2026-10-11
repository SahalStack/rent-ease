
const QuickLinkCard = ({ name, icon }) => {
	return (
		<div
			className="flex-none bg-surface-container-low hover:bg-primary-container/10 transition-colors cursor-pointer rounded-xl py-3 px-6 flex items-center gap-3 border border-outline-variant/30">
			<span className="material-symbols-outlined text-primary" data-icon={icon}>{icon}</span>
			<span className="font-label-md text-label-md whitespace-nowrap">{name}</span>
		</div>
	)
}

export default QuickLinkCard
