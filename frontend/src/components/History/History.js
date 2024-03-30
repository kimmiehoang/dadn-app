import "./history.css";

const History = ({ deviceType }) => {
  const labels = {
    light: "Light history",
    airConditioner: "Air conditioner history",
    door: "Door History",
  };
  return (
    <div className="device-history">
      <h5>{labels[deviceType]}</h5>
      <div className="history-table">
        <ul>
          <li>
            <span>Status</span>
            <span>Time</span>
          </li>
          <li>
            <span>Light On</span>
            <span>10:48 PM April 03, 2024 </span>
          </li>
          <li>
            <span>Light On</span>
            <span>10:48 PM April 03, 2024 </span>
          </li>
          <li>
            <span>Light On</span>
            <span>10:48 PM April 03, 2024 </span>
          </li>
          <li>
            <span>Light On</span>
            <span>10:48 PM April 03, 2024 </span>
          </li>
          <li>
            <span>Light On</span>
            <span>10:48 PM April 03, 2024 </span>
          </li>
          <li>
            <span>Light On</span>
            <span>10:48 PM April 03, 2024 </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default History;
