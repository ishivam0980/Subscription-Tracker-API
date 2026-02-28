import { Router } from 'express';
import userController from '../controller/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.use(authMiddleware);


userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);
userRouter.post('/', userController.createUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

export default userRouter;