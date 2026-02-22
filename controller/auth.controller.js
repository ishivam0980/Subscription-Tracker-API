import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

const generateToken = async (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )
}


const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('User with this email already exists', 409);
        }

    
        const saltRounds=10
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                }
            }
        });
    } catch (error) {
        next(error);
    }
};


const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            throw new AppError('Please provide email and password', 400);
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};


const signOut = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'User logged out successfully',
        });
    } catch (error) {
        next(error);
    }
};

export default { signUp, signIn, signOut };
