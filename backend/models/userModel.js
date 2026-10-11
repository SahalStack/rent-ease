import mongoose from 'mongoose';
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
	full_name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
	address: {
		fullAddress: String,
		city: String,
		state: String,
		postalCode: String,
		country: String,
	},
	status: {
		type: String,
		enum: ["Active", "Suspended", "Blocked"],
		default: "Active",
	},
	isBlocked: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true });

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

export default User;