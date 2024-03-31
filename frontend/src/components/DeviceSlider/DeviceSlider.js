import Slider from "@mui/material/Slider";
import "./DeviceSlider.css";

const DeviceSlider = ({ label, type, value, onChangeSlider }) => {
  const types = {
    light: "fa-regular fa-lightbulb",
    airConditioner: "fa-solid fa-wind",
  };

  const handleSliderChange = (event, newValue) => {
    onChangeSlider(newValue); // Call parent component's onChangeSlider function
  };

  return (
    <div className="device-slider">
      <span className="custom-label">{label}</span>
      <div>
        <i className={types[type]}></i>
        <Slider
          aria-label="Temperature"
          value={value}
          valueLabelDisplay="auto"
          step={25}
          min={0}
          marks
          max={75}
          style={{ width: "40%" }}
          onChangeCommitted={handleSliderChange} // Sử dụng onChangeCommitted thay vì onChange
        />
      </div>
    </div>
  );
};
export default DeviceSlider;
