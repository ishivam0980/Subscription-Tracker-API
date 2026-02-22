import express from 'express'
import dotenv from 'dotenv'
// import cors from 'cors' //no need as backend application only
import helmet from 'helmet'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import subscriptionRouter from './routes/subscription.routes.js'
import connectDB from './config/db.js'
import errorMiddleware from './middleware/error.middleware.js'
import AppError from './utils/AppError.js'

dotenv.config({ path: '.env.local' });//dotenv.config() by default looks for .env file

const app = express();

// 1. Security & Logging middleware
app.use(helmet());
app.use(morgan('dev')); // logs: GET /api/v1/users 200 12ms

// 2. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// 3. Routes
app.get('/', (req, res) =>
    res.send("Welcome To Subscription Tracker API")
)
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// 4. 404 catch-all (after all routes)
app.all('{*path}', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

// 5. Global error handler (MUST be LAST)
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});