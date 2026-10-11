// Basic selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectOrderStats = (state) => state.orders.stats;
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;

// Filter values
export const selectSearchQuery = (state) => state.orders.searchQuery;
export const selectStatusFilter = (state) => state.orders.statusFilter;
export const selectSortBy = (state) => state.orders.sortBy;

// Filtered + sorted + searched list
export const selectFilteredOrders = (state) => {
	const { orders, searchQuery, statusFilter, sortBy } = state.orders;
	console.log('searchqueryy:', searchQuery)
	console.log("statusFilter:", statusFilter);
	console.log('sortbyy::', sortBy);
	console.log("orders:", orders);

	let result = [...orders];

	if (statusFilter !== "all") {
		result = result.filter((o) => o.orderStatus === statusFilter);
	}
	
	const isSearching = searchQuery.trim().length >= 4;

	if (isSearching) {
		result = result.filter((o) =>
			o.items?.some((item) =>
				item.name?.toLowerCase().includes(searchQuery.toLowerCase())
			)
		);
	}

	if (sortBy === "newest") {
		result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
	} else if (sortBy === "oldest") {
		result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
	} else if (sortBy === "price-desc") {
		result.sort((a, b) => b.totalAmount - a.totalAmount);
	} else if (sortBy === "price-low") {
		result.sort((a, b) => a.totalAmount - b.totalAmount);
	}

	return result;
};