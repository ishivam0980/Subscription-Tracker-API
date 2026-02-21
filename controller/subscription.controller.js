import Subscription from '../models/subscription.model.js';
import AppError from '../utils/AppError.js';

// @desc    Get all subscriptions (for the logged-in user)
// @route   GET /api/v1/subscriptions
const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            data: subscriptions,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single subscription by ID
// @route   GET /api/v1/subscriptions/:id
const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }

        // Check if subscription belongs to the logged-in user
        if (subscription.user.toString() !== req.user._id.toString()) {
            throw new AppError('You are not authorized to view this subscription', 403);
        }

        res.status(200).json({
            success: true,
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new subscription
// @route   POST /api/v1/subscriptions
const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id, // attach the logged-in user's ID
        });

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update subscription
// @route   PUT /api/v1/subscriptions/:id
const updateSubscription = async (req, res, next) => {
    try {
        let subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }

        // Check ownership
        if (subscription.user.toString() !== req.user._id.toString()) {
            throw new AppError('You are not authorized to update this subscription', 403);
        }

        subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            message: 'Subscription updated successfully',
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete subscription
// @route   DELETE /api/v1/subscriptions/:id
const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);

        if (!subscription) {
            throw new AppError('Subscription not found', 404);
        }

        // Check ownership
        if (subscription.user.toString() !== req.user._id.toString()) {
            throw new AppError('You are not authorized to delete this subscription', 403);
        }

        await Subscription.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Subscription deleted successfully',
            data: null,
        });
    } catch (error) {
        next(error);
    }
};

export default {
    getAllSubscriptions,
    getSubscriptionById,
    createSubscription,
    updateSubscription,
    deleteSubscription,
};
