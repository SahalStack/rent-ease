import { createAsyncThunk } from "@reduxjs/toolkit";
import { postReview } from "../../services/reviewApiService";

export const addReview = createAsyncThunk(
	"review/addReview",
	async ({ productId, reviewData }, { rejectWithValue }) => {
		try {
			const data = await postReview(productId, reviewData);
			return data.review;
		} catch (error) {
			console.log('error', error)
			return rejectWithValue(error);
		}
	}
);