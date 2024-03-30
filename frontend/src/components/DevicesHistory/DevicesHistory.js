import "./DevicesHistory.css";

const DevicesHistory = () => {
  return (
    <div className="devices-history">
      <p>Device activity history</p>
      <ul>
        <li>
          <i class="fa-solid fa-lightbulb"></i>
          <span>Light</span>
        </li>
        <li>
          <i class="fa-solid fa-fan"></i>
          <span>Air conditioner</span>
        </li>
        <li>
          <i class="fa-solid fa-door-closed"></i>
          <span>Door</span>
        </li>
      </ul>
    </div>
  );
};

export default DevicesHistory;
