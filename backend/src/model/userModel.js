import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avtLink: { type: String },
    home: [{ type: String }],
  },
  { collection: 'users' }
);

const User = mongoose.model('User', userSchema);

export default User;
