import mongoose  from "mongoose";

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`MongoDB Connected Successfully...✅`)

	} catch (error) {
		console.log(`❌ MongoDB Error: ${error.message}`);
		process.exit(1);
	}
}

export default connectDb;