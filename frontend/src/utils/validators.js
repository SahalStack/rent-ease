export const validateUsername = (username) => {
	if (!username.trim()) return "Username is required";
	if (username.trim().length < 3) return "Username must be at least 3 characters";
	return "";
};

export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email.trim()) return "Email is required";
	if (!emailRegex.test(email)) return "Invalid email address";
	return "";
};

export const validatePhone = (phone) => {
	const phoneRegex = /^[6-9]\d{9}$/;
	if (!phone.trim()) return "Mobile number is required";
	if (!phoneRegex.test(phone)) return "Invalid mobile number";
	return "";
};

export const validatePassword = (password) => {
	if (!password.trim()) return "Password is required";
	if (password.length < 8) return "Password must be at least 8 characters";
	if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
	if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
	if (!/[0-9]/.test(password)) return "Password must contain at least one number";
	if (!/[!@#$%^&*]/.test(password)) return "Password must contain at least one special character (!@#$%^&*)";
	return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
	if (!confirmPassword.trim()) return "Please confirm your password";
	if (password !== confirmPassword) return "Passwords do not match";
	return "";
};

export const validateAddress = (address) => {
	if (!address.trim()) return "Address is required";
	if (address.trim().length < 10) return "Please enter a complete address";
	return "";
};

export const validatePincode = (pincode) => {
	const pincodeRegex = /^[1-9][0-9]{5}$/;
	if (!pincode.trim()) return "Pincode is required";
	if (!pincodeRegex.test(pincode)) return "Invalid pincode";
	return "";
};

// validate entire login form at once
export const validateLoginForm = ({ email, password }) => {
	if (validateEmail(email)) return validateEmail(email);
	if (!password || !password.trim()) return "Password is required";
	return "";
};

// validate entire register form at once
export const validateRegisterForm = ({ full_name, email, phone, password, confirm_password }) => {
	if (validateUsername(full_name)) return validateUsername(full_name);
	if (validateEmail(email)) return validateEmail(email);
	if (validatePhone(phone)) return validatePhone(phone);
	if (validatePassword(password)) return validatePassword(password);
	if (validateConfirmPassword(password, confirm_password)) return validateConfirmPassword(password, confirm_password);
	return ""; // ← no errors
};

export const validateCheckoutForm = ({ phone, address }) => {
	if (validatePhone(phone)) return validatePhone(phone);
	if (validateAddress(address)) return validateAddress(address);
	return "";
};

// check if form has any errors
export const hasErrors = (errors) => {
	return Object.values(errors).some(error => error !== "");
};