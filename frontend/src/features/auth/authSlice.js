import { createSlice } from "@reduxjs/toolkit";
import { login, register, updateAddress, updateProfile } from "./authThunk";

import { setAccessToken } from "../../services/authToken";

const getInitialAuth = () => {
	if (typeof window === "undefined") {
		return { currentUser: null, isAuthenticated: false };
	}
	try {
		const token = localStorage.getItem("token");
		const userStr = localStorage.getItem("user");
		const user = userStr ? JSON.parse(userStr) : null;
		if (token && user) {
			return { currentUser: user, isAuthenticated: true };
		}
	} catch {
		// Ignore corrupted JSON in localStorage
	}
	return { currentUser: null, isAuthenticated: false };
};

const initialAuth = getInitialAuth();

const initialState = {
	currentUser: initialAuth.currentUser,
	isAuthenticated: initialAuth.isAuthenticated,
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
			state.error = null;
			setAccessToken(null);
			if (typeof window !== "undefined") {
				localStorage.removeItem("user");
				localStorage.removeItem("token");
			}
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
				state.error = null;
				if (typeof window !== "undefined" && action.payload.user) {
					localStorage.setItem("user", JSON.stringify(action.payload.user));
				}
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
			.addCase(register.fulfilled, (state) => {
				state.isLoading = false;
				state.error = null;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
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
