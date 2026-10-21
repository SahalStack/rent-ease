const errorMiddleware = (err, req, res, next) => {
	console.error("ERROR:", err);

	const statusCode = err.statusCode || 500;
	const isOperational = err.isOperational || statusCode < 500;
	const message =
		process.env.NODE_ENV === "production" && !isOperational
			? "Internal server error"
			: err.message || "An unexpected error occurred";

	res.status(statusCode).json({
		success: false,
		message,
	});
};

export default errorMiddleware;