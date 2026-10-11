class AppError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = String(statusCode).startsWith("4")
			? "fail"
			: "error";

		this.isOperational = true;

		// Remove constructor call from stack trace
		Error.captureStackTrace(this, this.constructor);
	}
}

export default AppError;