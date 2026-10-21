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
	isDetailsLoading: false,
	cancellingOrderId: null,
	error: null,
};

// Stats always describe every order the customer owns, not the filtered subset.
const computeStats = (orders) => ({
	activeRentals: orders.filter((order) => order.orderStatus === "active").length,
	pendingOrders: orders.filter((order) => order.orderStatus === "pending").length,
	completedRentals: orders.filter((order) => order.orderStatus === "completed").length,
	totalSpent: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
});

const orderSlice = createSlice({
	name: "orders",
	initialState,

	reducers: {
		setSearchQuery(state, action) {
			state.searchQuery = action.payload;
		},
		setStatusFilter(state, action) {
			state.statusFilter = action.payload;
		},
		setSortBy(state, action) {
			state.sortBy = action.payload;
		},
		resetFilters(state) {
			state.searchQuery = "";
			state.statusFilter = "all";
			state.sortBy = "newest";
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchOrders.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})

			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.orders = action.payload;
				state.stats = computeStats(action.payload);
			})

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
				state.orders.unshift(action.payload.order);
				state.stats = computeStats(state.orders);
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

			.addCase(cancelOrder.pending, (state, action) => {
				state.cancellingOrderId = action.meta.arg;
				state.error = null;
			})
			.addCase(cancelOrder.fulfilled, (state, action) => {
				state.cancellingOrderId = null;
				const updatedOrder = action.payload.order;

				const index = state.orders.findIndex(
					(order) => order._id === updatedOrder._id
				);

				if (index !== -1) {
					state.orders[index] = updatedOrder;
				}

				state.stats = computeStats(state.orders);
			})
			.addCase(cancelOrder.rejected, (state, action) => {
				state.cancellingOrderId = null;
				state.error = action.payload;
			})

			.addCase(fetchOrderById.pending, (state) => {
				state.isDetailsLoading = true;
				state.error = null;
			})
			.addCase(fetchOrderById.fulfilled, (state, action) => {
				state.isDetailsLoading = false;
				state.currentOrder = action.payload;
			})
			.addCase(fetchOrderById.rejected, (state, action) => {
				state.isDetailsLoading = false;
				state.error = action.payload;
			});
	},
});

export const { setSearchQuery, setStatusFilter, setSortBy, resetFilters } = orderSlice.actions;
export default orderSlice.reducer;
