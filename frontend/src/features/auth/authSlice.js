import { createSlice } from "@reduxjs/toolkit";
import { login, register, updateAddress, updateProfile } from "./authThunk";

const initialState = {
	currentUser: null,
	isAuthenticated: false,
	isLoading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout: (state) => {
			state.currentUser = null;
			state.isAuthenticated = false;
		},
		clearAuthError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Login
			.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload.user;
				state.isAuthenticated = true;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			//Register
			.addCase(register.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload.user;
				state.isAuthenticated = true;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.currentUser = null;
				state.error = action.payload || "Registration failed. Please try again.";
			})

			//Profile
			.addCase(updateProfile.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload.user;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			//Address
			.addCase(updateAddress.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(updateAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.currentUser = action.payload.user;
			})
			.addCase(updateAddress.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
