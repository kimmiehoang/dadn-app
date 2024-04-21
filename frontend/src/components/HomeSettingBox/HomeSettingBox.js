// HomeSettingBox.js
import "./HomeSettingBox.css";
import axios from "axios";
import { useState, useEffect } from "react";
import HomeSettingForm from "../../components/HomeSettingForm";

const HomeSettingBox = ({ homeName }) => {
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/devices/air-conditioner/${homeName}`
        );
        const devices = response.data;
        setDeviceList(devices);
        console.log(devices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchData();
  }, [homeName]);

  return (
    <div className="home-setting-box">
      <h5>
        <strong>Home:</strong> <span className="homename">{homeName}</span>
      </h5>
      {deviceList.map((device, index) => (
        <HomeSettingForm key={index} device={device} />
      ))}
    </div>
  );
};

export default HomeSettingBox;
