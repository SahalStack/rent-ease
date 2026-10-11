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
	sameSite: "strict",
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = asyncHandler(async (req, res) => {
	const { full_name, phone, email, password } = req.body;

	//check if user already exist
	const existingUser = await User.findOne({
		$or: [{ email }, { phone }]
	});
	if (existingUser) {
		if (existingUser.email === email) throw new AppError("Email already registered", 400);
		if (existingUser.phone === phone) throw new AppError("Phone already registered", 400);
	}

	//create new user
	const newUser = await User.create({
		full_name,
		phone,
		email,
		password
	});

	// 5. Generate tokens
	const accessToken = generateAccessToken(newUser);
	const refreshToken = generateRefreshToken(newUser);

	// 6. Store refresh token securely
	newUser.refreshToken = crypto
		.createHash("sha256")
		.update(refreshToken)
		.digest("hex");
	await newUser.save();

	// 7. Send refresh token as httpOnly cookie
	res.cookie("refreshToken", refreshToken, cookieOptions);

	const { password: _, refreshToken: __, ...safeUser } = newUser.toObject();

	//send response to frontend
	res.status(201).json({
		success: true,
		message: "User registered successfully",
		accessToken,
		user: safeUser,
	});
});

const login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	//1.check if the user exist,
	const user = await User.findOne({ email }).select("+password");
	logger.warn({ email }, "Login failed: user not found");
	if (!user) throw new AppError('Invalid email or password', 400);

	//2.if user(email exist),compare password
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) throw new AppError('Invalid email or password', 400);

	// 3. generate tokens
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user);

	res.cookie("refreshToken", refreshToken, cookieOptions);

	const { password: _, ...safeUser } = user.toObject();

	logger.info({ userId: user._id }, "Login successful");

	// 4. send response
	res.status(200).json({
		message: 'Login successfull',
		accessToken: accessToken,
		user: safeUser
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
