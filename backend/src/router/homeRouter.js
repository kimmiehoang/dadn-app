import { Router } from 'express';
import HomeController from '../controller/homeController.js';

const homeRouter = Router();
const homeController = new HomeController();

homeRouter.get('/:homeName', homeController.getHomeData);

export default homeRouter;
