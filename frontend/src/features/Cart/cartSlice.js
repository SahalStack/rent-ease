import { createSlice } from "@reduxjs/toolkit";

const PROMO_CODES = {
	"RENT10": 10, 
	"SAVE10": 10,
};

const initialState = {
	items: [],
	promoCode: "",
	discount: 0,  
	promoApplied: false,
	promoError: "",
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existing = state.items.find((item) => item.id === action.payload.id);
			if (existing) {
				existing.quantity += action.payload.quantity;
				existing.duration = action.payload.duration;
			} else {
				state.items.push({ ...action.payload });
			}
		},
		removeFromCart: (state, action) => {
			state.items = state.items.filter(item => item.id !== action.payload);
		},
		clearCart: (state) => {
			state.items = [];
		},
		increaseQuantity: (state, action) => {
			const item = state.items.find(item => item.id === action.payload);
			if (item) item.quantity += 1;
		},
		decreaseQuantity: (state, action) => {
			const item = state.items.find(item => item.id === action.payload);
			if (item && item.quantity > 1) item.quantity -= 1;
		},
		changeDuration: (state, action) => {
			// action.payload = { id, duration }
			const item = state.items.find(item => item.id === action.payload.id);
			if (item) item.duration = action.payload.duration;
		},
		applyPromo: (state, action) => {
			const code = action.payload.toUpperCase();
			if (PROMO_CODES[code]) {
				state.promoCode = code;
				state.discount = PROMO_CODES[code];
				state.promoApplied = true;
				state.promoError = "";
			} else {
				state.promoError = "Invalid promo code";
				state.promoApplied = false;
				state.discount = 0;
			}
		},
		removePromo: (state) => {
			state.promoCode = "";
			state.discount = 0;
			state.promoApplied = false;
			state.promoError = "";
		},
	}
})

export const {
	addToCart,
	removeFromCart,
	clearCart,
	increaseQuantity,
	decreaseQuantity,
	changeDuration,
	applyPromo,
	removePromo,
} = cartSlice.actions;

export default cartSlice.reducer;