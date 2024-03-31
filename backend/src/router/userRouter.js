import { Router } from 'express';
import UserController from '../controller/userController.js';

const userRouter = Router();
const userController = new UserController();

// userRouter.get('/list', userController.getUsers);
// userRouter.post('/create', userController.createUser);
userRouter.get('/:email', userController.getUserByEmail);
// userRouter.put('/:id', userController.updateUser); //not done
// userRouter.delete('/:id', userController.deleteUser); //not done
userRouter.post('/signin', userController.login);

export default userRouter;
