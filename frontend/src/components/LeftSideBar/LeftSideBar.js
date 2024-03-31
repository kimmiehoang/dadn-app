import { useNavigate } from "react-router-dom";
import "./leftSideBar.css";

const LeftSideBar = ({ mode, onChangeMode }) => {
  const navigate = useNavigate();
  const imageUrl =
    "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg";

  const handleIconClick = () => {
    navigate("/signin");
  };

  return (
    <div className="leftSideBar">
      <h3 className="title">
        <i className="fa-solid fa-house-laptop"></i> Smart Home
      </h3>
      <div className="avatar">
        <img src={imageUrl} alt="avatar" />
      </div>
      <h5 className="name-houseOwner">House Owner</h5>
      <i
        className="fa-solid fa-power-off off-icon"
        onClick={handleIconClick}
      ></i>
      <div className="category d-flex f-column f-center">
        <button
          className={`btn ${mode === "dashboard" ? "active" : ""}`}
          onClick={() => {
            onChangeMode("dashboard");
          }}
        >
          <i className="fa-solid fa-chalkboard"></i>
          <span>Dashboard</span>
        </button>
        <button
          className={`btn ${mode === "setting" ? "active" : ""}`}
          onClick={() => {
            onChangeMode("setting");
          }}
        >
          <i className="fa-solid fa-gear"></i>
          <span>Settings</span>
        </button>
      </div>
      <div className="contact d-flex f-column">
        <span>Contact support</span>
        <span style={{ color: "var(--lightblue)" }}>18009198</span>
      </div>
    </div>
  );
};

export default LeftSideBar;
