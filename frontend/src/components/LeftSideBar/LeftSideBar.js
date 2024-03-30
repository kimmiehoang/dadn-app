import "./leftSideBar.css";
const LeftSideBar = () => {
  return (
    <div className="leftSideBar">
      <h3 className="title">
        <i className="fa-solid fa-house-laptop"></i> Smart Home
      </h3>
      <div className="avatar">
        <img
          src="https://t4.ftcdn.net/jpg/02/66/72/41/360_F_266724172_Iy8gdKgMa7XmrhYYxLCxyhx6J7070Pr8.jpg"
          alt="avatar"
        />
      </div>
      <h5 className="name-houseOwner">House Owner</h5>
      <i class="fa-solid fa-power-off off-icon"></i>
      <div className="category d-flex f-column f-center">
        <button className="btn active">
          <i class="fa-solid fa-chalkboard"></i>
          <span>Dashboard</span>
        </button>
        <button className="btn">
          <i class="fa-solid fa-gear"></i>
          <span>Settings</span>
        </button>
      </div>
      <div className="contact d-flex f-column">
        <span>Contact support</span>
        <span style={{color:"var(--purblue)"}}>18009198</span>
      </div>
    </div>
  );
};

export default LeftSideBar;
