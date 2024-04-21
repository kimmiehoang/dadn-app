import Slider from "@mui/material/Slider";
import "./DeviceSlider.css";
import { useState, useEffect } from "react";
import axios from "axios";

const DeviceSlider = ({
  label,
  type,
  value,
  onChangeSlider,
  temperature,
  tempThreshold,
  deviceTempValue,
  adafruitUsername,
  AIOkey,
  autoMode,
}) => {
  const types = {
    light: "fa-regular fa-lightbulb",
    airConditioner: "fa-solid fa-wind",
  };

  const handleSliderChange = (event, newValue) => {
    onChangeSlider(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (autoMode == 1) {
        let tempValue = 0;
        try {
          if (parseFloat(temperature) > tempThreshold.tempThresholdHigh) {
            tempValue = deviceTempValue[3];
            const response = await axios.post(
              `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-fan/data`,
              {
                value: tempValue,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-AIO-Key": AIOkey,
                },
              }
            );
          } else if (
            parseFloat(temperature) > tempThreshold.tempThresholdAverage
          ) {
            tempValue = deviceTempValue[2];
            const response = await axios.post(
              `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-fan/data`,
              {
                value: tempValue,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-AIO-Key": AIOkey,
                },
              }
            );
          } else if (parseFloat(temperature) > tempThreshold.tempThresholdLow) {
            tempValue = deviceTempValue[1];
            const response = await axios.post(
              `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-fan/data`,
              {
                value: tempValue,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-AIO-Key": AIOkey,
                },
              }
            );
          } else {
            const response = await axios.post(
              `https://io.adafruit.com/api/v2/${adafruitUsername}/feeds/bbc-fan/data`,
              {
                value: tempValue,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-AIO-Key": AIOkey,
                },
              }
            );
          }
        } catch (error) {
          console.error("Error sending request to Adafruit:", error);
        }
      }
    };
    fetchData();
  }, [temperature]);

  return (
    <div className="device-slider">
      <span className="custom-label">{label}</span>
      <div>
        <i className={types[type]}></i>
        <Slider
          aria-label="Temperature"
          value={value}
          valueLabelDisplay="auto"
          step={25}
          min={0}
          marks
          max={75}
          style={{ width: "40%" }}
          onChangeCommitted={handleSliderChange}
        />
      </div>
    </div>
  );
};
export default DeviceSlider;
