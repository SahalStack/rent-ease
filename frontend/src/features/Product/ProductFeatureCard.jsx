const ProductFeatureCard = ({ feature }) => {
	return (
		<div className="flex flex-col items-center text-center gap-stack-sm">
			<div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
				<span className="material-symbols-outlined text-[32px]" data-icon={feature.featureIcon}>{feature.featureIcon}</span>
			</div>
			<h3 className="text-headline-sm font-headline-sm text-primary">{feature.featureHeadline}</h3>
			<p className="text-body-md font-body-md text-on-surface-variant">{feature.featureDescription}</p>
		</div>
	)
}

export default ProductFeatureCard
