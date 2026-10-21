import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	getProducts,
	getProductById,
} from "../../services/productApiService";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (query, thunkAPI) => {
	try {
		const data = await getProducts(query);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
	}
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id, thunkAPI) => {
	try {
		const data = await getProductById(id);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch product"
		);
	}
});