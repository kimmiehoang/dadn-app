import { useState } from "react";
import LeftSideBar from "../../components/LeftSideBar";
import Statistic from "../../components/Statistic";
import Switch from "react-switch";
import "./style.css";

const Dashboard = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <div className="dashboard">
      <LeftSideBar />
      <div className="main-board">
        <div className="welcome-text">
          <h3>
            Hello <span>Tien Hoang,</span>
          </h3>
          <h2>have a good day!</h2>
        </div>
        <div className="body d-flex">
          <div className="w-50">
            <div className="row switch-btn">
              <span>Light</span>
              <div>
                <i class="fa-regular fa-lightbulb"></i>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  offColor="#EFEFEF"
                  onColor="#A770FF"
                  width={80}
                />
              </div>
            </div>
            <div className="row switch-btn">
              <span>Auto lighting mode</span>
              <div>
                <i
                  class="fa-regular fa-lightbulb"
                  style={{ color: "#FFD43B" }}
                ></i>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  offColor="#EFEFEF"
                  onColor="#A770FF"
                  width={80}
                />
              </div>
            </div>
            <div className="row door-switch">
              <img src="https://www.cotswood-doors.co.uk/wp-content/uploads/2019/07/1930s-accoya-front-door-2.jpg" />
              <p>Front door</p>
              <div className="lock-icon">
                <i class="fa-solid fa-lock" style={{ color: "#FFD43B" }}></i>
              </div>
            </div>
          </div>
          <div className="w-50">
            <div className="row switch-btn">
              <span>Air Condition</span>
              <div>
                <i class="fa-solid fa-wind"></i>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  offColor="#EFEFEF"
                  onColor="#A770FF"
                  width={80}
                />
              </div>
            </div>
            <div className="row switch-btn">
              <span>Auto air-conditioning mode</span>
              <div>
                <i class="fa-solid fa-wind" style={{ color: "#FFD43B" }}></i>
                <Switch
                  onChange={handleChange}
                  checked={checked}
                  offColor="#EFEFEF"
                  onColor="#A770FF"
                  width={80}
                />
              </div>
            </div>
            <div className="row door-switch">
              <img src="https://securityintelligence.com/wp-content/uploads/2017/02/did-your-developer-leave-a-website-backdoor.jpg" />
              <p>Back door</p>
              <div className="lock-icon">
                <i class="fa-solid fa-lock-open open-lock-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="devices-history">
          <p>Device activity history</p>
          <ul>
            <li>
              <i class="fa-solid fa-lightbulb"></i>
              <span>Light</span>
            </li>
            <li>
              <i class="fa-solid fa-fan"></i>
              <span>Air conditioner</span>
            </li>
            <li>
              <i class="fa-solid fa-door-closed"></i>
              <span>Door</span>
            </li>
          </ul>
        </div>
      </div>
      <Statistic />
    </div>
  );
};
export default Dashboard;
