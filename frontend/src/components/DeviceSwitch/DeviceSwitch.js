import Switch from "react-switch";
import "./DeviceSwitch.css";

const DeviceSwitch = ({ label, type, status, onSwitch }) => {
  const types = {
    light: "fa-regular fa-lightbulb",
    airConditioner: "fa-solid fa-wind",
    autoLight: "fa-regular fa-lightbulb",
    autoAirConditioner: "fa-solid fa-wind",
  };

  const color = {
    light: { color: "#FFFFFF" },
    airConditioner: { color: "#FFFFFF" },
    autoLight: { color: "#FFBC00" },
    autoAirConditioner: { color: "#FFBC00" },
  };

  return (
    <div className="device-switch">
      <span>{label}</span>
      <div>
        <i className={types[type]} style={color[type]}></i>
        <Switch
          onChange={onSwitch}
          checked={status}
          offColor="#EFEFEF"
          onColor="#A770FF"
          width={80}
          checkedIcon={false}
          uncheckedIcon={false}
        />
      </div>
    </div>
  );
};
export default DeviceSwitch;
