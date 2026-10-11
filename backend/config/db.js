import mongoose from "mongoose";

const connectDb = async () => {
	if (!process.env.MONGODB_URI) {
		console.log("❌ MONGODB_URI is not set");
		process.exit(1);
	}

	mongoose.connection.on("disconnected", () => {
		console.log("⚠️ MongoDB disconnected");
	});

	mongoose.connection.on("error", (err) => {
		console.log(`❌ MongoDB runtime error: ${err.message}`);
	});

	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			serverSelectionTimeoutMS: 10000,
		});
		console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(`❌ MongoDB Error: ${error.message}`);
		process.exit(1);
	}
};

export default connectDb;