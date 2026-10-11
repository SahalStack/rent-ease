import express from 'express';
import { validateRegister, validateLogin } from '../middleware/validate.js';
import rateLimit from "express-rate-limit";
import validateErrors from '../middleware/validateErrors.js';
import verifyToken from '../middleware/verifyToken.js';
import { register, login, me, updateProfile, updateAddress } from '../controllers/authController.js'

const authRouter = express.Router();

const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: { message: "Too many attempts. Try later." },
});

authRouter.post('/register', validateRegister, validateErrors, register);
authRouter.post('/login', validateLogin, validateErrors, login);
authRouter.use(verifyToken);
authRouter.get('/me', me);
authRouter.put("/profile", updateProfile);
authRouter.put("/address", updateAddress);

export default authRouter;
