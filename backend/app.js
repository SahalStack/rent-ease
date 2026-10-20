import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from 'express-rate-limit'
import helmet from "helmet";
import morgan from 'morgan';
import mongoSanitize from "@exortek/express-mongo-sanitize";
import pinoHttp from "pino-http";

// file importing
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import reviewRouter from "./routes/reviewRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import logger from "./config/logger.js";

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 300,
	standardHeaders: true,
	legacyHeaders: false,
	message: "Too many requests from this IP, please try again later",
});

app.set("trust proxy", 1);
app.disable("x-powered-by");

//Middlewares
app.use(helmet());
// app.use(
// 	pinoHttp({
// 		logger,
// 		serializers: {
// 			req: () => undefined,
// 			res: () => undefined,
// 		},
// 		customSuccessMessage: (req, res) =>
// 			`${req.method} ${req.url} ${res.statusCode}`,
// 		customErrorMessage: (req, res) =>
// 			`${req.method} ${req.url} ${res.statusCode}`,
// 	})
// );
if (process.env.NODE_ENV !== 'production') {
	app.use(morgan('dev'));
}

const allowedOrigins = [process.env.CLIENT_URL, process.env.ADMIN_URL].filter(Boolean);

app.use(cors({
	origin: allowedOrigins,
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/payments/webhook", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "10kb" }));
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', limiter);

//Routes
app.use('/api/auth', authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/dashboard", dashboardRouter);

app.use((req, res) => {
	res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorMiddleware);

export default app;