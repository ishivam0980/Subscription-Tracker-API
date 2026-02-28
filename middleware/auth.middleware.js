import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';

const authMiddleware = async (req, res, next) => {
    try {
        // 1. Get token from Authorization header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
            // "Bearer eyJhbG..." → ["Bearer", "eyJhbG..."] → take index [1]
        }

        if (!token) {
            throw new AppError('You are not logged in. Please log in to get access.', 401);
        }

        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // If token is invalid or expired, jwt.verify throws an error automatically

        // 3. Find user from decoded token
        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            throw new AppError('The user belonging to this token no longer exists.', 401);
        }

        // 4. Attach user to request — now every controller can use req.user
        req.user = user;

        next(); // passed all checks, proceed to the controller
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;
