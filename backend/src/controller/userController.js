import User from '../model/userModel.js';
import CookieController from '../controller/cookieController.js';
const cookieController = new CookieController();

class UserController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      // Kiểm tra mật khẩu
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      if (result.email !== null && isMatch) {
        let key = 'dadn232';

        var payload = result.email;

        var tokenResult = cookieController.encodeCookie(payload, key);
        //console.log(tokenResult);

        // Đăng nhập thành công
        res.status(200).json({ success: true, token: tokenResult });
      } else {
        res.status(401).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: 'User created', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async getUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findById(email);
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
    const { id } = req.params;
    const newData = req.body;
    try {
      const user = await User.findByIdAndUpdate(id, newData, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User updated', user: user });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted', user: user });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default UserController;
