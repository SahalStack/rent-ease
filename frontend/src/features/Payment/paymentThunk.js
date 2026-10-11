import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCheckoutSession } from "../../services/paymentApiService";

export const checkout = createAsyncThunk("payment/checkout", async (orderData, thunkAPI) => {
	try {
		const token = localStorage.getItem("token"); 
		return await createCheckoutSession(orderData, token);
		
	} catch (error) {
		return thunkAPI.rejectWithValue(
			error.response?.data?.message || error.message
		);
	}
});