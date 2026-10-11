const Spinner = ({ label }) => {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full gap-3">
			<div className="animate-spin rounded-full border-4 border-gray-200 border-t-black h-8 w-8"></div>
			<p className="text-sm text-gray-600">
				Loading {label}...
			</p>
		</div>
	);
};

export default Spinner;