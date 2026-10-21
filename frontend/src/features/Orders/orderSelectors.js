import { createSelector } from "@reduxjs/toolkit";

// Basic selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectOrderStats = (state) => state.orders.stats;
export const selectOrdersLoading = (state) => state.orders.isLoading;
export const selectOrdersError = (state) => state.orders.error;
export const selectDetailsLoading = (state) => state.orders.isDetailsLoading;
export const selectCancellingOrderId = (state) => state.orders.cancellingOrderId;

// Filter values
export const selectSearchQuery = (state) => state.orders.searchQuery;
export const selectStatusFilter = (state) => state.orders.statusFilter;
export const selectSortBy = (state) => state.orders.sortBy;

const MIN_SEARCH_LENGTH = 4;

const matchesStatus = (order, statusFilter) =>
	statusFilter === "all" || order.orderStatus === statusFilter;

const matchesSearch = (order, searchQuery) => {
	const query = searchQuery.trim().toLowerCase();

	if (query.length < MIN_SEARCH_LENGTH) return true;

	return order.items?.some((item) =>
		item.name?.toLowerCase().includes(query)
	);
};

const sorters = {
	newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
	oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
	"price-desc": (a, b) => b.totalAmount - a.totalAmount,
	"price-low": (a, b) => a.totalAmount - b.totalAmount,
};

// Filtered + sorted list, memoized so the list only re-renders when inputs change
export const selectFilteredOrders = createSelector(
	[selectAllOrders, selectStatusFilter, selectSearchQuery, selectSortBy],
	(orders, statusFilter, searchQuery, sortBy) => {
		const filtered = orders.filter(
			(order) =>
				matchesStatus(order, statusFilter) &&
				matchesSearch(order, searchQuery)
		);

		const sorter = sorters[sortBy];

		return sorter ? [...filtered].sort(sorter) : filtered;
	}
);
