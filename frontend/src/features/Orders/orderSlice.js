import { createSlice } from "@reduxjs/toolkit";
import { cancelOrder, createOrder, fetchOrderById, fetchOrders, verifyOrder } from "./orderThunk";

const initialState = {
	orders: [],
	currentOrder: null,
	stats: {
		activeRentals: 0,
		pendingOrders: 0,
		completedRentals: 0,
		totalSpent: 0,
	},
	searchQuery: "",
	statusFilter: "all",
	sortBy: "newest",
	isLoading: false,
	error: null,
};

const orderSlice = createSlice({
	name: "orders",
	initialState,

	reducers: {
		setSearchQuery(state, action) {
			state.searchQuery = action.payload;
		},
		setStatusFilter(state, action) {
			state.statusFilter = action.payload; // "all" | "active" | "pending" | "completed"
		},
		setSortBy(state, action) {
			state.sortBy = action.payload; // "newest" | "oldest" | "price-high" | "price-low"
		},
		resetFilters(state) {
			state.searchQuery = "";
			state.statusFilter = "all";
			state.sortBy = "newest";
		},
	},

	extraReducers: (builder) => {
		builder
			// Pending: loading started
			.addCase(fetchOrders.pending, (state) => {
				console.log('fetching orderss....')
				state.isLoading = true;
				state.error = null;
			})

			// Fulfilled: data received
			.addCase(fetchOrders.fulfilled, (state, action) => {
				console.log("payload:", action.payload);
				state.isLoading = false;
				state.orders = action.payload;
				const orders = action.payload;

				state.stats.activeRentals = orders.filter((o) => o.orderStatus === "active").length;
				state.stats.pendingOrders = orders.filter((o) => o.orderStatus === "pending").length;
				state.stats.completedRentals = orders.filter((o) => o.orderStatus === "returned").length;
				state.stats.totalSpent = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
			})

			// Rejected: something went wrong
			.addCase(fetchOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				// Add newly created order
				state.orders.unshift(action.payload.order);
				state.stats.pendingOrders += 1;
				state.stats.totalSpent += action.payload.order.totalAmount;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(verifyOrder.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(verifyOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentOrder = action.payload;
			})
			.addCase(verifyOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(cancelOrder.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(cancelOrder.fulfilled, (state, action) => {
				const updatedOrder = action.payload.order;

				const index = state.orders.findIndex(
					order => order._id === updatedOrder._id
				);

				if (index !== -1) {
					state.orders[index] = updatedOrder;
				}
			})
			.addCase(cancelOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			.addCase(fetchOrderById.pending, (state) => {
				state.isLoading = true;
			})

			.addCase(fetchOrderById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentOrder = action.payload;
			})

			.addCase(fetchOrderById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
	},
})

export const { setSearchQuery, setStatusFilter, setSortBy, resetFilters } = orderSlice.actions;
export default orderSlice.reducer;