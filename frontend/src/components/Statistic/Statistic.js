import "./statistic.css"
const Statistic = () => {
  return (
    <div className="statistic">
      <h3>Statistic</h3>
      <div className="diagram">

      </div>
      <div className="temp-hum grid-container">
        <div className="temp grid-item"></div>
        <div className="hum grid-item"></div>
      </div>
      <div className="weather">
      </div>
    </div>
  );
};

export default Statistic;
