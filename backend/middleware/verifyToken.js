import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		return res.status(401).json({
			success: false,
			message: 'Unauthorized',
		})
	}

	try {
		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.log('error from jwt', error);
		return res.status(401).json({
			success: false,
			message: 'Invalid Token',
		});
	}

}

export default verifyToken;