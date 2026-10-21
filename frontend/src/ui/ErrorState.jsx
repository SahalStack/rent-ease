const ErrorState = ({ message, onRetry }) => {
	return (
		<div className="flex flex-col items-center justify-center py-section-padding text-center animate-fadeUp">
			<span className="material-symbols-outlined text-[72px] text-error/70">
				cloud_off
			</span>

			<h2 className="font-headline-sm text-headline-sm text-on-surface mt-6">
				Could not load your orders
			</h2>

			<p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm">
				{message || "Something went wrong while fetching your orders."}
			</p>

			{onRetry && (
				<button
					type="button"
					onClick={onRetry}
					className="mt-8 bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-body-md hover:bg-primary-container transition-all"
				>
					Try Again
				</button>
			)}
		</div>
	);
};

export default ErrorState;
