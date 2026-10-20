const errorMiddleware = (err, req, res, next) => {
	console.error("ERROR:", err);

	res.status(err.statusCode || 500).json({
		success: false,
		message:
			process.env.NODE_ENV === "production"
				? "Internal server error"
				: err.message,
	});
};

export default errorMiddleware;