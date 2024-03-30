import "./DevicesHistory.css";

const DevicesHistory = ({mode,onChangeMode}) => {
  return (
    <div className="devices-history">
      <p>Device activity history</p>
      <ul>
        <li onClick={()=>{onChangeMode("light")}}>
          <i className="fa-solid fa-lightbulb"></i>
          <span>Light</span>
        </li>
        <li onClick={()=>{onChangeMode("airConditioner")}}>
          <i className="fa-solid fa-fan"></i>
          <span>Air conditioner</span>
        </li>
        <li onClick={()=>{onChangeMode("door")}}>
          <i className="fa-solid fa-door-closed"></i>
          <span>Door</span>
        </li>
      </ul>
    </div>
  );
};

export default DevicesHistory;
