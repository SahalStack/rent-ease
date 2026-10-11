import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrdersApi, createOrderApi, verifyOrderApi, cancelOrderApi, getOrderById } from "../../services/ordersApi";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async (_, thunkAPI) => {
	try {
		const orders = await fetchOrdersApi();
		console.log("fetchOrders api response:", orders);
		return orders;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			error.response?.data?.message || "Failed to fetch orders"
		);
	}
});

export const fetchOrderById = createAsyncThunk("orders/fetchOrderById", async (orderId, thunkAPI) => {
	try {
		// await new Promise((resolve) => setTimeout(resolve, 5000)); // 3 seconds
		const order = await getOrderById(orderId);
		return order;
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});

export const createOrder = createAsyncThunk("orders/createOrder", async (orderData, thunkAPI) => {
	try {
		const data = await createOrderApi(orderData);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue(
			error.response?.data?.message || "Failed to create order"
		);
	}
});

export const verifyOrder = createAsyncThunk("orders/verifyOrder", async (sessionId, thunkAPI) => {
	try {
		const order = await verifyOrderApi(sessionId);
		console.log("verifyOrder api response:", order);
		return order;
	} catch (error) {
		console.log("error in verifyOrder:", error);
		return thunkAPI.rejectWithValue(
			error.response?.data?.message || error.message
		);
	}
});

export const cancelOrder = createAsyncThunk("orders/cancelOrder", async (orderId, { rejectWithValue }) => {
	try {
		const order = await cancelOrderApi(orderId);
		return order;
	} catch (error) {
		console.log('Error in cancelling order:', error)
		return rejectWithValue(error);
	}
});