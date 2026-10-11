export const applyProductSort = (query, sort) => {
	switch (sort) {
		case "low-to-high":
			return query.sort({ price: 1 });

		case "high-to-low":
			return query.sort({ price: -1 });

		case "new":
			return query.sort({ createdAt: -1 });

		default:
			return query;
	}
};
