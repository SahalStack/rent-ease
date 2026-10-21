import bcrypt from "bcryptjs";
import crypto from "crypto";

import User from '../models/userModel.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import AppError from "../utils/appError.js";
import asyncHandler from '../utils/asyncHandler.js';
import logger from "../config/logger.js";

const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
	const { full_name, phone, email, password } = req.body;

	// 1. check if user already exists
	const existingUser = await User.findOne({
		$or: [{ email }, { phone }],
	});

	if (existingUser) {
		if (existingUser.email === email) {
			logger.warn({ email, ip: req.ip }, "Register failed: email already registered");
			throw new AppError("Email already registered", 409);
		}
		logger.warn({ phone, ip: req.ip }, "Register failed: phone already registered");
		throw new AppError("Phone already registered", 409);
	}

	// 2. create new user
	const newUser = await User.create({ full_name, phone, email, password });

	// 3. generate tokens
	const accessToken = generateAccessToken(newUser);
	const refreshToken = generateRefreshToken(newUser);

	// 4. store hashed refresh token
	newUser.refreshToken = crypto
		.createHash("sha256")
		.update(refreshToken)
		.digest("hex");
	await newUser.save();

	// 5. send cookie
	res.cookie("refreshToken", refreshToken, cookieOptions);

	const { password: _, refreshToken: __, ...safeUser } = newUser.toObject();

	logger.info({ userId: newUser._id, ip: req.ip }, "Register successful");

	// 6. response
	res.status(201).json({
		success: true,
		message: "User registered successfully",
		accessToken,
		user: safeUser,
	});
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// 1. find user
	const user = await User.findOne({ email }).select("+password");
	if (!user) {
		logger.warn({ email, ip: req.ip }, "Login failed: user not found");
		throw new AppError("Invalid email or password", 401);
	}

	// 2. compare password
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		logger.warn({ userId: user._id, ip: req.ip }, "Login failed: wrong password");
		throw new AppError("Invalid email or password", 401);
	}

	// 3. generate tokens
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	user.refreshToken = crypto
		.createHash("sha256")
		.update(refreshToken)
		.digest("hex");
	await user.save();

	res.cookie("refreshToken", refreshToken, cookieOptions);
	const { password: _, ...safeUser } = user.toObject();

	logger.info({ userId: user._id, ip: req.ip }, "Login successful");

	// 4. response
	res.status(200).json({
		message: "Login successful",
		accessToken,
		user: safeUser,
	});
});

const me = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user.id);
	if (!user) throw new AppError("User not found", 404);

	res.status(200).json({ success: true, user });
});

const updateProfile = asyncHandler(async (req, res) => {

	const { name, email, phone } = req.body;

	const user = await User.findById(req.user.id);
	if (!user) throw new AppError("User not found", 404);

	user.full_name = name || user.full_name;
	user.email = email || user.email;
	user.phone = phone || user.phone;

	await user.save();

	res.status(200).json({
		success: true,
		message: "Profile updated successfully",
		user
	});
});

const updateAddress = asyncHandler(async (req, res) => {

	const { fullAddress, city, state, postalCode } = req.body;

	const user = await User.findById(req.user.id);
	if (!user) throw new AppError("User not found", 404);
	user.address = { fullAddress, city, state, postalCode };

	await user.save();

	res.status(200).json({
		success: true,
		message: "Address updated successfully",
		user
	});

});

export {
	register,
	login,
	me,
	updateProfile,
	updateAddress,
};
