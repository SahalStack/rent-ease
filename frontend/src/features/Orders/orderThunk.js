import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	fetchOrdersApi,
	createOrderApi,
	verifyOrderApi,
	cancelOrderApi,
	getOrderById,
} from "../../services/ordersApi";

export const fetchOrders = createAsyncThunk(
	"orders/fetchOrders",
	async (_, { rejectWithValue }) => {
		try {
			return await fetchOrdersApi();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchOrderById = createAsyncThunk(
	"orders/fetchOrderById",
	async (orderId, { rejectWithValue }) => {
		try {
			return await getOrderById(orderId);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const createOrder = createAsyncThunk(
	"orders/createOrder",
	async (orderData, { rejectWithValue }) => {
		try {
			return await createOrderApi(orderData);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const verifyOrder = createAsyncThunk(
	"orders/verifyOrder",
	async (sessionId, { rejectWithValue }) => {
		try {
			return await verifyOrderApi(sessionId);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const cancelOrder = createAsyncThunk(
	"orders/cancelOrder",
	async (orderId, { rejectWithValue }) => {
		try {
			return await cancelOrderApi(orderId);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
