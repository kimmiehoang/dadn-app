import React, { useState, useEffect } from "react";
import "./statistic.css";
import chartImg from "../../assets/images/chart.png";
import weatherImg from "../../assets/images/forecast.png";
import axios from "axios";

const Statistic = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-temp/data?limit=1"
        );
        //console.log(response);
        const data = response.data;
        setTemperature(data[0].value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Gọi fetchData ngay sau khi component được mount
    fetchData();

    // Thiết lập interval để gọi fetchData mỗi 10 giây
    const intervalId = setInterval(fetchData, 10000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-humid/data?limit=1"
        );
        //console.log(response);
        const data = response.data;
        setHumidity(data[0].value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Gọi fetchData ngay sau khi component được mount
    fetchData();

    // Thiết lập interval để gọi fetchData mỗi 10 giây
    const intervalId = setInterval(fetchData, 10000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="statistic">
      <h3>Statistics</h3>
      <div className="diagram">
        <div>
          <div className="title">
            <i className="fa-solid fa-bolt"></i>
            <span>Power Consumed</span>
          </div>
          <div className="option">
            <span>This week</span>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <img src={chartImg} alt="graph" />
      </div>
      <div className="temp-hum grid-container">
        <div className="temp grid-item">
          <span>Temperature</span>
          <span className="param">
            {temperature !== null ? `+ ${temperature}°C` : "..."}
          </span>
          <i className="fa-solid fa-temperature-quarter"></i>
        </div>
        <div className="hum grid-item">
          <span>Humidity</span>
          <span className="param">
            {humidity !== null ? `${humidity}%` : "..."}
          </span>
          <i className="fa-solid fa-water"></i>
        </div>
      </div>
      <div className="weather">
        <div>
          <div className="title">
            <i className="fa-solid fa-cloud"></i>
            <span>Weather forecast</span>
          </div>
          <div className="address">
            <span>District 1, Ho Chi Minh City</span>
          </div>
        </div>
        <div className="forecast">
          <img src={weatherImg} alt="img" />
          <div>
            <span>Tomorrow</span>
            <span>PARTY CLOUDY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
