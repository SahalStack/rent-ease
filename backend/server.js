import "dotenv/config";
import dns from "node:dns";
import app from "./app.js";
import connectDb from "./config/db.js";

if (process.env.NODE_ENV !== "production") {
	dns.setServers(["8.8.8.8", "1.1.1.1"]);
}
dns.setDefaultResultOrder("ipv4first");

const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";
let server;

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);
	if (server) {
		server.close(() => process.exit(1));
	} else {
		process.exit(1);
	}
});

const startServer = async () => {
	try {
		await connectDb();
		server = app.listen(PORT, HOST, () => {
			console.log(`Server listening on ${HOST}:${PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

startServer();