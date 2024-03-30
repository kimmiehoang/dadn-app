import Switch from "react-switch";
import "./DeviceSwitch.css";

const DeviceSwitch = ({ label, type, status, onSwitch }) => {
  const types = {
    light: "fa-regular fa-lightbulb",
    airConditioner: "fa-solid fa-wind",
  };

  return (
    <div className="device-switch">
      <span>{label}</span>
      <div>
        <i className={types[type]}></i>
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
