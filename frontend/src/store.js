import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../src/features/auth/authSlice';
import productReducer from "../src/features/Product/productSlice";
import cartReducer from '../src/features/Cart/cartSlice'
import orderReducer from '../src/features/Orders/orderSlice';
import paymentReducer from '../src/features/Payment/paymentSlice'
import reviewReducer from '../src/features/Review/reviewSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productReducer,
		cart: cartReducer,
		orders: orderReducer,
		payment: paymentReducer,
		review: reviewReducer,
	},
});
