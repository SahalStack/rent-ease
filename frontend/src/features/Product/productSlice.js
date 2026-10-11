import { createSlice } from "@reduxjs/toolkit";
import {
	fetchProducts,
	fetchProductById,
} from "./productThunk";

const initialState = {
	products: [],
	product: null,
	isLoading: false,
	error: null,
	filters: {
		search: "",
		category: "",
		sort: "",
	},
};

const productSlice = createSlice({
	name: "products",

	initialState,

	reducers: {
		setSearch: (state, action) => {
			state.filters.search = action.payload;
		},

		setCategory: (state, action) => {
			state.filters.category = action.payload;
		},

		setSort: (state, action) => {
			state.filters.sort = action.payload;
		},

		clearFilters: (state) => {
			state.filters = {
				search: "",
				category: "",
				sort: "",
			};
		},
		clearProduct(state) {
			state.product = null;
		}
	},

	extraReducers: (builder) => {
		builder

			// GET ALL PRODUCTS
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// GET PRODUCT BY ID
			.addCase(fetchProductById.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})

			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.product = action.payload;
			})

			.addCase(fetchProductById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const {
	setSearch,
	setCategory,
	setSort,
	clearFilters,
	clearProduct,
} = productSlice.actions;

export default productSlice.reducer;