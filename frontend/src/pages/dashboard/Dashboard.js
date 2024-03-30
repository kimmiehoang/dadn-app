import { useState } from "react";
import LeftSideBar from "../../components/LeftSideBar";
import Statistic from "../../components/Statistic";
import DeviceSwitch from "../../components/DeviceSwitch";
import Door from "../../components/Door";
import DevicesHistory from "../../components/DevicesHistory";
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
            <DeviceSwitch
              label="Light"
              type="light"
              status={checked}
              onSwitch={handleChange}
            />
            <DeviceSwitch
              label="Auto lighting mode"
              type="light"
              status={checked}
              onSwitch={handleChange}
            />
            <Door
              label="Front door"
              type="front"
              status={checked}
              onChangeStatus={handleChange}
            />
          </div>
          <div className="w-50">
            <DeviceSwitch
              label="Air conditioner"
              type="airConditioner"
              status={checked}
              onSwitch={handleChange}
            />
            <DeviceSwitch
              label="Auto air-conditioning mode"
              type="airConditioner"
              status={checked}
              onSwitch={handleChange}
            />
            <Door
              label="Back door"
              type="back"
              status={checked}
              onChangeStatus={handleChange}
            />
          </div>
        </div>
        <DevicesHistory/>
      </div>
      <Statistic />
    </div>
  );
};
export default Dashboard;
