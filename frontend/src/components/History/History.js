import { useEffect, useState } from "react";
import axios from "axios";
import "./history.css";

const History = ({ deviceType }) => {
  const labels = {
    light: "Light history",
    airConditioner: "Air conditioner history",
    door: "Door History",
  };

  const [historyData, setHistoryData] = useState([]);

  const formatDate = (createdAtString) => {
    const createdAtDate = new Date(createdAtString);
    const hour = createdAtDate.getHours();
    const minute = createdAtDate.getMinutes();
    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = createdAtDate.getFullYear();
    return { hour, minute, day, month, year };
  };

  useEffect(() => {
    var url;
    if (deviceType == "light") {
      url =
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-led/data?limit=20";
    } else if (deviceType == "airConditioner") {
      url =
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-fan/data?limit=20";
    } else if (deviceType == "door") {
      url =
        "https://io.adafruit.com/api/v2/tienhoang/feeds/bbc-door/data?limit=20";
    }
    const fetchHistoryData = async () => {
      try {
        const response = await axios.get(url); // Thay thế 'http://your-api-url/history' bằng URL API của bạn
        setHistoryData(response.data); // Set dữ liệu nhận được vào state
        console.log(historyData);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchHistoryData(); // Gọi hàm lấy dữ liệu khi component được mount
  }, []); // Dependencies rỗng để chỉ gọi một lần khi component mount

  return (
    <div className="device-history">
      <h5>{labels[deviceType]}</h5>
      <div className="history-table">
        <ul>
          <li>
            <span>Status</span>
            <span>Time</span>
          </li>
          {historyData.map((item, index) => (
            <li key={index}>
              {deviceType === "light" && (
                <span>{item.value === "0" ? "Light Off" : "Light On"}</span>
              )}
              {deviceType === "airConditioner" && (
                <span>Air conditioner runs at speed: {item.value}</span>
              )}
              {deviceType === "door" && (
                <span>
                  {item.value === "0" ? "Door Closed" : "Door Opened"}
                </span>
              )}
              <span>
                {formatDate(item.created_at).hour}:
                {formatDate(item.created_at).minute} -{" "}
                {formatDate(item.created_at).day}/
                {formatDate(item.created_at).month}/
                {formatDate(item.created_at).year}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default History;
