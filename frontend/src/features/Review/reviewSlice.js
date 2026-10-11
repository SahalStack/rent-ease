import { createSlice } from "@reduxjs/toolkit";
import { addReview } from "./reviewThunk";

const reviewSlice = createSlice({
	name: "review",
	initialState: {
		loading: false,
		error: null,
		review: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addReview.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addReview.fulfilled, (state, action) => {
				state.loading = false;
				state.review = action.payload;
			})
			.addCase(addReview.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default reviewSlice.reducer;