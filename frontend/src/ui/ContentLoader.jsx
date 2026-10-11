export default function ContentLoader({
	text = "Loading...",
	size = "w-8 h-8",
}) {
	return (
		<div className="w-full flex flex-col items-center justify-start pt-16 md:pt-24">
			<span
				className={`animate-spin ${size} border-2 border-primary border-t-transparent rounded-full mb-4`}
			></span>

			<p className="text-headline-sm font-headline-sm text-on-surface-variant">
				{text}
			</p>
		</div>
	);
}