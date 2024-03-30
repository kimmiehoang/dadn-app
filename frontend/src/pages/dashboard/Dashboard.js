import { useState } from "react";
import LeftSideBar from "../../components/LeftSideBar";
import Statistic from "../../components/Statistic";
import DeviceSwitch from "../../components/DeviceSwitch";
import DeviceSlider from "../../components/DeviceSlider";
import Door from "../../components/Door";
import DevicesHistory from "../../components/DevicesHistory";
import "./style.css";

const Dashboard = () => {
  const [checkedFront, setCheckedFront] = useState(false);
  const [checkedBack, setCheckedBack] = useState(false);
  const [checkedLight, setCheckedLight] = useState(false);
  const [checkedAir, setCheckedAir] = useState(0);
  const [checkedAutoLight, setCheckedAutoLight] = useState(false);
  const [checkedAutoAir, setCheckedAutoAir] = useState(false);

  const handleChangeFront = (nextChecked) => {
    setCheckedFront(nextChecked);
  };

  const handleChangeBack = (nextChecked) => {
    setCheckedBack(nextChecked);
  };

  const handleChangeLight = (nextChecked) => {
    setCheckedLight(nextChecked);
  };

  const handleChangeAir = (nextChecked) => {
    setCheckedAir(nextChecked);
  };

  const handleChangeAutoLight = (nextChecked) => {
    setCheckedAutoLight(nextChecked);
  };

  const handleChangeAutoAir = (nextChecked) => {
    setCheckedAutoAir(nextChecked);
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
              status={checkedLight}
              onSwitch={handleChangeLight}
            />
            <DeviceSwitch
              label="Auto lighting mode"
              type="light"
              status={checkedAutoLight}
              onSwitch={handleChangeAutoLight}
            />
            <Door
              label="Front door"
              type="front"
              status={checkedFront}
              onChangeStatus={handleChangeFront}
            />
          </div>
          <div className="w-50">
            <DeviceSlider
              label="Air conditioner"
              type="airConditioner"
              value={checkedAir}
              onChangeSlider={handleChangeAir}
            />
            <DeviceSwitch
              label="Auto air-conditioning mode"
              type="airConditioner"
              status={checkedAutoAir}
              onSwitch={handleChangeAutoAir}
            />
            <Door
              label="Back door"
              type="back"
              status={checkedBack}
              onChangeStatus={handleChangeBack}
            />
          </div>
        </div>
        <DevicesHistory />
      </div>
      <Statistic />
    </div>
  );
};
export default Dashboard;
