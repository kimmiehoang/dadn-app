// userController.js
import UserModel from '../model/userModel.js';
import CookieController from '../controller/cookieController.js';

const userModel = new UserModel();
const cookieController = new CookieController();

class UserController {
  constructor() {
    //this.model = new UserModel();
  }

  async handleLogin(req, res) {
    try {
      const { username, password } = req.body;

      //console.log(username);
      //console.log(password);

      //var username = "john.doe@example.com";
      //var password = "hashedpassword1";

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Username and password are required.',
        });
      }

      const result = await userModel.login(username, password);

      //console.log(result);

      if (result.userID !== null) {
        let key = 'cnpm231';

        var payload = result.userID;

        var tokenResult = cookieController.encodeCookie(payload, key);
        //console.log(tokenResult);

        // Đăng nhập thành công
        res
          .status(200)
          .json({ success: true, token: tokenResult, isSPSO: result.isSPSO });
      } else {
        res.status(401).json({ success: false, message: result.message });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  async displayAllUsers(req, res) {
    try {
      const users = await userModel.getAllUsers();
      console.log(users);
      return res.json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }

  async displayUserInfo(req, res) {
    try {
      const { token } = req.body;
      let userId = cookieController.decodeCookie(token);

      const user = await userModel.getUserById(userId);

      if (user.length === 0) {
        res.status(404).json({ success: false, message: 'User not found' });
      } else {
        res.status(200).json({ success: true, data: user[0] });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  async updateUserInfo(req, res) {
    try {
      const newData = req.body;

      /*
      const newData = {
        token:"123678cnpm231",
        name: "John Doe",
        DoB: "1990-01-15",
        phone: "0000000",
        address: "123 Main St",
      }; */

      const userId = cookieController.decodeCookie(newData.token);
      const result = await userModel.updateUserById(userId, newData);

      if (result.affectedRows === 0) {
        res.status(404).json({ success: false, message: 'User not found' });
      } else {
        res
          .status(200)
          .json({ success: true, message: 'User updated successfully' });
      }
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }

  async updateUserStatus(req, res) {
    try {
      const { userID } = req.body;
      //let userID = 1;
      let check = await userModel.checkStatus(userID);
      //console.log(check);
      let result;
      if (check == 'Active') {
        result = await userModel.updateUserStatus(userID, 'Inactive');
      } else if (check == 'Inactive') {
        result = await userModel.updateUserStatus(userID, 'Active');
      }
      //console.log(result);
      if (result[0].affectedRows > 0) {
        return res.status(200).json({
          success: true,
          message: 'User status updated successfully.',
        });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'User not found.' });
      }
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    }
  }
}

export default UserController;
