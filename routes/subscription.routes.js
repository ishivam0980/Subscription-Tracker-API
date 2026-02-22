import { Router } from 'express';
import subscriptionController from '../controller/subscription.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const subscriptionRouter = Router();

// All subscription routes require authentication
subscriptionRouter.get('/', authMiddleware, subscriptionController.getAllSubscriptions);
subscriptionRouter.get('/:id', authMiddleware, subscriptionController.getSubscriptionById);
subscriptionRouter.post('/', authMiddleware, subscriptionController.createSubscription);
subscriptionRouter.put('/:id', authMiddleware, subscriptionController.updateSubscription);
subscriptionRouter.delete('/:id', authMiddleware, subscriptionController.deleteSubscription);

export default subscriptionRouter;