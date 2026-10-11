import AppError from "../utils/appError.js";

export const authorize = (...roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		throw new AppError("You are not allowed to do this", 403);
	}
	next();
};