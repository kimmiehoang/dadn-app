import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HomeSettingForm.css";

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
      <strong>Temperature threshold for {device.deviceName} (°C)</strong>

      <div className="home-setting-info">
        <div className="home-setting-field">
          <label>Low</label>
          <input
            type="number"
            name="tempThresholdLow"
            placeholder={device.deviceSettings.tempThresholdLow}
            value={formData.tempThresholdLow || ""}
            onChange={handleChange}
          />
        </div>

        <div className="home-setting-field">
          <label>Average</label>
          <input
            type="number"
            name="tempThresholdAverage"
            placeholder={device.deviceSettings.tempThresholdAverage}
            value={formData.tempThresholdAverage || ""}
            onChange={handleChange}
          />
        </div>

        <div className="home-setting-field">
          <label>High</label>
          <input
            type="number"
            name="tempThresholdHigh"
            placeholder={device.deviceSettings.tempThresholdHigh}
            value={formData.tempThresholdHigh || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="home-setting-buttons">
        <button className="save" type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default HomeSettingForm;
