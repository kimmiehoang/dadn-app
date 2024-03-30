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
        <i class={types[type]}></i>
        <Switch
          onChange={onSwitch}
          checked={status}
          offColor="#EFEFEF"
          onColor="#A770FF"
          width={80}
        />
      </div>
    </div>
  );
};
export default DeviceSwitch;
