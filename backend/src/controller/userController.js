import User from '../model/userModel.js';
import CookieController from '../controller/cookieController.js';
const cookieController = new CookieController();

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = user.password == password;
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (isMatch) {
        let key = 'dadn232';

        let tokenResult = cookieController.encodeCookie(user.email, key);

        res.status(200).json({ success: true, token: tokenResult });
      } else {
        res.status(401).json({ success: false, message: 'Wrong password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  // async getUsers(req, res) {
  //   try {
  //     const users = await User.find();
  //     res.status(200).json(users);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // }

  // async createUser(req, res) {
  //   try {
  //     const { username, email, password } = req.body;
  //     const newUser = new User({ username, email, password });
  //     await newUser.save();
  //     res.status(201).json({ message: 'User created', user: newUser });
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // }

  async getUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async updateUser(req, res) {
    const newData = req.body;
    const filter = { email: newData.email };
    try {
      const user = await User.findOneAndUpdate(filter, newData, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found after update' });
      }
      res.status(200).json({ message: 'User updated', success: true });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default UserController;
