import User from '../models/user.model.js';
import AppError from '../utils/AppError.js';

// @desc    Get all users
// @route   GET /api/v1/users
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        // .select('-password') excludes password field from response

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single user by ID
// @route   GET /api/v1/users/:id
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new user (admin use)
// @route   POST /api/v1/users
const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('User with this email already exists', 409);
        }

        const user = await User.create({ name, email, password });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user
// @route   PUT /api/v1/users/:id
const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,          // return updated doc, not the old one
            runValidators: true, // still run schema validations on update
        }).select('-password');

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
