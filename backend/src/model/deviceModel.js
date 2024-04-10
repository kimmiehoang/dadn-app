import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    deviceName: { type: String },
    homeName: { type: String },
    autoDevice: { type: Boolean },
    deviceValue: [{ type: Number }],
    deviceSettings: [
      {
        tempThreshold: [{ type: Number }],
      },
    ],
  },
  { collection: 'devices' }
);

const Device = mongoose.model('Device', deviceSchema);

export default Device;
