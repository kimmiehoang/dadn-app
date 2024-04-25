import Device from '../model/deviceModel.js';
import CookieController from '../controller/cookieController.js';
const cookieController = new CookieController();
import mongoose from 'mongoose';

class DeviceController {
  async allAirConditioners(req, res) {
    const newData = req.params;

    try {
      const devices = await Device.find({
        homeName: newData.homeName,
        deviceType: 'air-conditioner',
      });

      if (!devices || devices.length === 0) {
        return res.status(404).json({ message: 'No device found' });
      }

      res.status(200).json(devices);
    } catch (error) {
      console.error('Error finding devices:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateDevice(req, res) {
    const deviceId = req.params.deviceID;
    const deviceIdObjectId = new mongoose.Types.ObjectId(deviceId);
    const updateData = req.body;

    try {
      // Tìm thiết bị dựa trên deviceId
      const device = await Device.findById(deviceIdObjectId);
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }

      device.deviceSettings = updateData;
      await device.save();

      res
        .status(200)
        .json({ message: 'Device information updated successfully' });
    } catch (error) {
      console.error('Error updating device information:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default DeviceController;
