import { Router } from 'express';
import userController from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', authMiddleware, userController.updateUser);
userRouter.delete('/:id', authMiddleware, userController.deleteUser);

export default userRouter;