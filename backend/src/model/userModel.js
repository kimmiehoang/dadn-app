import mongoose from 'mongoose';

// Kết nối đến MongoDB
await mongoose
  .connect('mongodb://127.0.0.1:27017/smartHome', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection;
const userCollection = db.collection('user');

// Class User để thực hiện truy vấn dữ liệu
class UserModel {
  //   constructor(name, email, password) {
  //     this.name = name;
  //     this.email = email;
  //     this.password = password;
  //   }

  async getAllUsers() {
    try {
      const users = await userCollection.find().toArray();
      //console.log(users);
      return users;
    } catch (error) {
      throw new Error(`Error querying users: ${error.message}`);
    }
  }
}

export default UserModel;
