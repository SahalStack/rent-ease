// features/auth/authThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
	loginUser,
	registerUser,
	updateAddressApi,
	updateProfileApi,
} from "../../services/authApiService";
import { setAccessToken } from "../../services/authToken";
import { getErrorMessage } from "../../utils/getErrorMessage";

// Login
export const login = createAsyncThunk(
	"auth/login",
	async (credentials, { rejectWithValue }) => {
		try {
			const data = await loginUser(credentials);
			setAccessToken(data.accessToken);
			return data;
		} catch (err) {
			return rejectWithValue(getErrorMessage(err));
		}
	}
);

// Register
export const register = createAsyncThunk(
	"auth/register",
	async (userData, { rejectWithValue }) => {
		try {
			const data = await registerUser(userData);
			setAccessToken(data.accessToken);
			return data;
		} catch (err) {
			return rejectWithValue(getErrorMessage(err));
		}
	}
);

// Update profile
export const updateProfile = createAsyncThunk(
	"user/updateProfile",
	async (formData, { rejectWithValue }) => {
		try {
			const data = await updateProfileApi(formData);
			toast.success(data.message);
			return data;
		} catch (err) {
			toast.error(err.message);
			return rejectWithValue(err.message);
		}
	}
);

// Update address
export const updateAddress = createAsyncThunk(
	"user/updateAddress",
	async (addressData, { rejectWithValue }) => {
		try {
			const data = await updateAddressApi(addressData);
			toast.success(data.message);
			return data;
		} catch (err) {
			toast.error(err.message);
			return rejectWithValue(err.message);
		}
	}
);