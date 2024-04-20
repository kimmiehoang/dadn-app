import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeSettingForm = ({ device }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initialFormData = {};
    for (const key in device.deviceSettings) {
      initialFormData[key] = device.deviceSettings[key];
    }
    setFormData(initialFormData);
  }, [device]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData);
    try {
      await axios.put(
        `http://localhost:5000/devices/settings/update/${device._id}`,
        formData
      );
      console.log("Device information updated successfully");
    } catch (error) {
      console.error("Error updating device information:", error);
    }
  };

  return (
    <form className="home-setting-form" onSubmit={handleOnSubmit}>
      <br />
      <h6>Temperature threshold for air-conditioner (°C)</h6>
      <div>
        <label>{`Air-conditioner: ${device.deviceName}`}</label>
        <br />
        <label>Low</label>
        <br />
        <input
          type="text"
          name="tempThresholdLow"
          placeholder={device.deviceSettings.tempThresholdLow}
          value={formData.tempThresholdLow || ""}
          onChange={handleChange}
        />
        <br />
        <label>Average</label>
        <br />
        <input
          type="text"
          name="tempThresholdAverage"
          placeholder={device.deviceSettings.tempThresholdAverage}
          value={formData.tempThresholdAverage || ""}
          onChange={handleChange}
        />
        <br />
        <label>High</label>
        <br />
        <input
          type="text"
          name="tempThresholdHigh"
          placeholder={device.deviceSettings.tempThresholdHigh}
          value={formData.tempThresholdHigh || ""}
          onChange={handleChange}
        />
      </div>
      <div className="profile-buttons">
        <button className="save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default HomeSettingForm;
