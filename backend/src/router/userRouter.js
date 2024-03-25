import { Router } from 'express';
import UserController from '../controller/userController.js';

const userRouter = Router();
const userController = new UserController();

userRouter.get('/list', userController.displayAllUsers);

export default userRouter;
