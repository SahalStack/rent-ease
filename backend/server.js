import dns from "node:dns";
import dotenv from "dotenv";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

process.on('unhandledRejection', err => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

dotenv.config();

import app from "./app.js";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 3001;

const startServer = async () => {
	try {
		await connectDb();
		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();