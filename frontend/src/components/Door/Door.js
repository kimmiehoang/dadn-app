import "./Door.css";

const Door = ({ label, type, status, onChangeStatus }) => {
  const types = {
    front:
      "https://www.cotswood-doors.co.uk/wp-content/uploads/2019/07/1930s-accoya-front-door-2.jpg",
    back: "https://securityintelligence.com/wp-content/uploads/2017/02/did-your-developer-leave-a-website-backdoor.jpg",
  };

  return (
    <div className="door">
      <img src={types[type]} />
      <p>{label}</p>
      <div className="lock-icon" onClick={onChangeStatus}>
        <i
          class={`fa-solid fa-lock${status ? "-open" : ""}`}
          style={{ color: status ? "#000" : "#FFD43B" }}
        ></i>
      </div>
    </div>
  );
};
export default Door;