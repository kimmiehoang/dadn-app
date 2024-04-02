import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./leftSideBar.css";
import Cookies from "universal-cookie";
import axios from "axios";

const LeftSideBar = ({ mode, onChangeMode, update }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [name, setName] = useState("");
  const [avt, setAvt] = useState("");
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const imageUrl =
    "https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg";

  const handleIconClick = () => {
    if (window.confirm("Do you want to log out?")) {
      cookies.remove("token");
      cookies.remove("isLogged");
      navigate("/signin");
    }
  };

  useEffect(() => {
    const token = cookies.get("token");
    const parts = token.split("232123456");
    const email = parts[0];

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        const userData = response.data;
        const fullName = `${userData.firstName} ${userData.lastName}`;
        setName(fullName);
        setAvt(userData.avtLink);
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    };

    fetchData();
  }, [cookies]);

  useEffect(() => {
    setUpdateTrigger((prev) => !prev);
  }, [update]);

  return (
    <div className="leftSideBar">
      <h3 className="title">
        <i className="fa-solid fa-house-laptop"></i> Smart Home
      </h3>
      <div className="avatar">
        <img src={avt} alt="avatar" />
      </div>
      <h5 className="name-houseOwner">{name}</h5>
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
