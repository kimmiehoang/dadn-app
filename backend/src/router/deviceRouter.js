import { Router } from 'express';
import DeviceController from '../controller/deviceController.js';

const deviceRouter = Router();
const deviceController = new DeviceController();

deviceRouter.get(
  '/air-conditioner/:homeName',
  deviceController.allAirConditioners
);
deviceRouter.put('/settings/update/:deviceID', deviceController.updateDevice);
export default deviceRouter;
