export const buildProductFilter = (queryParams) => {
	const {
		category,
		search,
		minPrice,
		maxPrice,
	} = queryParams;

	const filter = {};

	if (category) {
		filter.category = category.toLowerCase();
	}

	if (search) {
		filter.name = {
			$regex: search,
			$options: "i",
		};
	}

	if (minPrice || maxPrice) {
		filter.price = {};

		if (minPrice) {
			filter.price.$gte = Number(minPrice);
		}

		if (maxPrice) {
			filter.price.$lte = Number(maxPrice);
		}
	}

	return filter;
};