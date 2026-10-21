import { validationResult } from 'express-validator';

const validateErrors = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errorList = errors.array();
		return res.status(400).json({
			success: false,
			message: errorList[0]?.msg || "Validation error",
			errors: errorList,
		});
	}
	next();
};

export default validateErrors;