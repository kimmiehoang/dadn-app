import Device from '../model/deviceModel.js';
import CookieController from '../controller/cookieController.js';
const cookieController = new CookieController();

class DeviceController {
  async tempThresholdSet(req, res) {
    const newData = req.body;

    try {
      const device = await Device.findOne({
        homeName: newData.homeName,
        deviceName: newData.deviceName,
      });

      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }
      res.status(200).json({ message: device.deviceSettings, success: true });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default DeviceController;
