// Products
export const selectProducts = (state) =>
	state.products.products;

// Single Product
export const selectProduct = (state) =>
	state.products.product;

// Loading
export const selectProductsLoading = (state) =>
	state.products.isLoading;

// Error
export const selectProductsError = (state) =>
	state.products.error;

// Pagination
export const selectCurrentPage = (state) =>
	state.products.currentPage;

export const selectTotalPages = (state) =>
	state.products.totalPages;
