import { createSlice } from "@reduxjs/toolkit";
import { checkout } from '../Payment/paymentThunk'

const initialState = {
	isLoading: false,
	error: null,
	sessionId: null,
};

const paymentSlice = createSlice({
	name: "payment",
	initialState,
	reducers: {},

	extraReducers: (builder) => {
		builder
			.addCase(checkout.pending, (state) => {
				state.isLoading = true;
				state.error = null;
				state.sessionId = null;
			})
			.addCase(checkout.fulfilled, (state, action) => {
				state.isLoading = false;
				state.sessionId = action.payload.id;
			})
			.addCase(checkout.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default paymentSlice.reducer;