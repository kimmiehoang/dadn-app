import { Router } from 'express';
import UserController from '../controller/userController.js';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/:email', userController.getUserByEmail);
userRouter.post('/update', userController.updateUser);
userRouter.post('/signin', userController.login);

export default userRouter;
