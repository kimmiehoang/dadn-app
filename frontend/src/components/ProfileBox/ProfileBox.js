import "./ProfileBox.css";
import catImg from "../../assets/images/cat.jpg";

const ProfileBox = () => {
  return (
    <div className="profile-box">
      <h5>Accountant Settings</h5>
      <form className="profile-form">
        <div className="profile-avatar">
          <img src={catImg} alt="avatar" />
          <span>Change profile photo</span>
          <span>Change password</span>
        </div>
        <div className="profile-input">
          <div className="name">
            <div className="fname">
              <label>First name</label>
              <br />
              <input type="text" placeholder="Tien" />
            </div>
            <div className="lname">
              <label>Last name</label>
              <br />
              <input type="text" placeholder="Hoan" />
            </div>
          </div>
          <div className="email">
            <label>Email</label>
            <br />
            <input type="text" placeholder="tienhoang@gmail.com" />
          </div>
        </div>
        <div className="profile-buttons">
          <button>Cancel</button>
          <button className="save">Save</button>
        </div>
      </form>
    </div>
  );
};
export default ProfileBox;
