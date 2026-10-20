import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkout } from "../features/Payment/paymentThunk";
import { validateCheckoutForm } from "../utils/validators";
import { useNavigate } from "react-router-dom";

const useCheckout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const cartItems = useSelector((state) => state.cart.items);
	const { currentUser } = useSelector((state) => state.auth);
	const { isLoading, error } = useSelector((state) => state.payment);

	const [formData, setFormData] = useState({
		phone: currentUser?.phone || "",
		address: currentUser?.address?.fullAddress || "",
		notes: "",
	});

	useEffect(() => {
		if (cartItems.length === 0) {
			navigate("/");
		}
	}, [cartItems]);

	const [validationError, setValidationError] = useState("");

	const handleChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const subtotal = cartItems.reduce((total, item) => {
		return total + item.price * item.quantity * item.duration;
	}, 0);

	const totalSecurityDeposit = cartItems.reduce((total, item) => {
		return total + item.securityDeposit * item.quantity;
	}, 0);

	const deliveryFee = 49;
	const totalAmount = subtotal + totalSecurityDeposit + deliveryFee;

	const handlePayment = async () => {
		setValidationError("");

		const error = validateCheckoutForm(formData);
		if (error) {
			setValidationError(error);
			return;
		}

		if (cartItems.length === 0) {
			setValidationError("Your cart is empty.");
			return;
		}

		const paymentData = {
			items: cartItems.map((item) => ({
				...item,
			})),
			phone: formData.phone,
			address: formData.address,
			notes: formData.notes,
		};

		try {
			const result = await dispatch(checkout(paymentData));

			if (checkout.fulfilled.match(result)) {
				const { url } = result.payload;

				if (!url) {
					setValidationError("Stripe checkout URL was not returned.");
					return;
				}

				window.location.href = url;
			} else {
				setValidationError(result.payload || "Failed to start payment.");
			}
		} catch (err) {
			setValidationError(err.message || "Something went wrong.");
		}
	};

	return {
		// Data
		cartItems,
		formData,
		// Prices
		subtotal,
		totalSecurityDeposit,
		deliveryFee,
		totalAmount,
		// State
		isLoading,
		error,
		validationError,
		// Handlers
		handleChange,
		handlePayment,
	};
};

export default useCheckout;