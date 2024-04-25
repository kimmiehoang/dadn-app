import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema(
  {
    homeName: { type: String, required: true, unique: true },
    address: { type: String },
    owner: [{ type: String }],
    userAdafruit: { type: String },
    key: { type: String },
  },
  { collection: 'homes' }
);

const Home = mongoose.model('Home', homeSchema);

export default Home;
