const ProductPagination = ({
	currentPage,
	totalPages,
	updateParam,
}) => {

	const pages = [...Array(totalPages)].map(
		(_, index) => index + 1
	);

	return (
		<div className="mt-stack-lg flex items-center justify-center gap-2">
			<button
				disabled={currentPage === 1}
				onClick={() =>
					updateParam("page", currentPage - 1)
				}
				className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant"
			>
				<span className="material-symbols-outlined">
					chevron_left
				</span>
			</button>

			{pages.map((page) => (
				<button
					key={page}
					onClick={() =>
						updateParam("page", page)
					}
					className={`w-10 h-10 rounded-lg font-label-md
					${
						currentPage === page
							? "bg-primary text-on-primary"
							: "border border-outline-variant"
					}`}
				>
					{page}
				</button>
			))}

			<button
				disabled={currentPage === totalPages}
				onClick={() =>
					updateParam("page", currentPage + 1)
				}
				className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant"
			>
				<span className="material-symbols-outlined">
					chevron_right
				</span>
			</button>

		</div>
	);
};

export default ProductPagination;