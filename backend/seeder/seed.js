// seeder/seed.js
import "dotenv/config";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import { users } from "./data/users.js";

// Safety: block production
if (process.env.NODE_ENV === "production") {
	console.error("Seeding is blocked in production!");
	process.exit(1);
}

const importUsers = async () => {
	await User.deleteMany();
	await User.create(users);
	console.log("Users imported ✅");
};

const destroyUsers = async () => {
	await User.deleteMany();
	console.log("Users destroyed 🗑️");
};

const run = async () => {
	try {
		await connectDB();
		if (process.argv[2] === "--destroy") {
			await destroyUsers();
		} else {
			await importUsers();
		}
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		await mongoose.disconnect();
	}
};

run();