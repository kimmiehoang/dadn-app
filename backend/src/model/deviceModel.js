import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    deviceName: { type: String },
    homeName: { type: String },
    autoDevice: { type: Boolean },
    deviceValue: [{ type: Number }],
    deviceSettings: {
      tempThresholdLow: { type: Number },
      tempThresholdAverage: { type: Number },
      tempThresholdHigh: { type: Number },
    },
  },
  { collection: 'devices' }
);

const Device = mongoose.model('Device', deviceSchema);

export default Device;
