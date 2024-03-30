import "./statistic.css";
import chartImg from "../../assets/images/chart.png";
import weatherImg from "../../assets/images/forecast.png";

const Statistic = () => {
  return (
    <div className="statistic">
      <h3>Statistic</h3>
      <div className="diagram">
        <div>
          <div className="title">
            <i className="fa-solid fa-bolt"></i>
            <span>Power Consumed</span>
          </div>
          <div className="option">
            <span>This week</span>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
        <img src={chartImg} alt="graph" />
      </div>
      <div className="temp-hum grid-container">
        <div className="temp grid-item">
          <span>Temperature</span>
          <span className="param">+ 30°C</span>
          <i className="fa-solid fa-temperature-quarter"></i>
        </div>
        <div className="hum grid-item">
          <span>Humidity</span>
          <span className="param">30%</span>
          <i className="fa-solid fa-water"></i>
        </div>
      </div>
      <div className="weather">
        <div>
          <div className="title">
            <i className="fa-solid fa-cloud"></i>
            <span>Weather forecast</span>
          </div>
          <div className="address">
            <span>District 1, Ho Chi Minh City</span>
          </div>
        </div>
        <div className="forecast">
          <img src={weatherImg} alt="img" />
          <div>
            <span>Tomorrow</span>
            <span>PARTY CLOUDY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistic;
