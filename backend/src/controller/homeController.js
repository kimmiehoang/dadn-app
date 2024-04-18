import Home from '../model/homeModel.js';
import CookieController from '../controller/cookieController.js';
const cookieController = new CookieController();

class HomeController {
  async getHomeData(req, res) {
    const newData = req.params;

    try {
      const home = await Home.findOne({
        homeName: newData.homeName,
      });

      if (!home) {
        return res.status(404).json({ message: 'Home not found' });
      }
      res.status(200).json({ data: home });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default HomeController;
