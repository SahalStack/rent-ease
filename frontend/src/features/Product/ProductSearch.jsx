import { useState, useEffect } from "react";
import { sort as sortOptions } from "../../../data";

const ProductSearch = ({ search, sort, updateParam }) => {
	const [localSearch, setLocalSearch] = useState(search);

	useEffect(() => {
		const timer = setTimeout(() => {
			updateParam("search", localSearch);
		}, 400);

		return () => clearTimeout(timer);
	}, [localSearch]);

	const handleSearchChange = (e) => {
		setLocalSearch(e.target.value);
	};

	const handleSortChange = (e) => {
		updateParam("sort", e.target.value);
	};


	return (
		<div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm mb-12 flex flex-col md:flex-row gap-4 items-center">
			<div className="relative w-full md:flex-1">
				<span
					className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
				<input
					className="w-full pl-10 pr-4 py-2 bg-transparent border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-lg text-body-md font-body-md"
					placeholder="Search for furniture, appliances..."
					value={localSearch}
					onChange={handleSearchChange}
					type="text" />

				{search && (
					<button
						type="button"
						onClick={() => {
							setLocalSearch("");
							updateParam("search", "");
						}}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
					>
						✕
					</button>
				)}
			</div>

			<div className="flex flex-wrap gap-3 w-full md:w-auto">
				<select
					value={sort}
					onChange={handleSortChange}
					className="bg-transparent border-outline-variant rounded-lg text-label-md font-label-md px-4 py-2 focus:border-primary focus:ring-primary"
				>
					<option value="">Sort By</option>
					{sortOptions.map((option) => (
						<option
							key={option.id}
							value={option.slug}
						>
							{option.name}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}

export default ProductSearch
