import "./ProfileBox.css";
import catImg from "../../assets/images/cat.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const ProfileBox = () => {
  const [avt, setAvt] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("token");
  const parts = token.split("232123456");
  const email = parts[0];

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/${email}`
        );
        const userData = response.data;
        setAvt(userData.avtLink);
        setState({
          firstName: userData.firstName,
          lastName: userData.lastName,
        });
      } catch (error) {
        console.error("Error fetching user by email:", error);
      }
    };

    fetchData();
  }, [email]);

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { firstName, lastName } = state;

    console.log(state);

    const userData = {
      firstName,
      lastName,
      email: email,
    };

    console.log(userData);

    try {
      const response = await fetch("http://localhost:5000/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      //console.log(data);
      if (data.success == true) {
        window.alert(data.message);
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  return (
    <div className="profile-box">
      <h5>Account Settings</h5>
      <form className="profile-form" onSubmit={handleOnSubmit}>
        <div className="profile-avatar">
          <img src={avt} alt="avatar" />
          <span>Change profile photo</span>
          <span>Change password</span>
        </div>
        <div className="profile-input">
          <div className="name">
            <div className="fname">
              <label>First name</label>
              <br />
              <input
                type="text"
                //placeholder={state.firstName}
                value={state.firstName}
                name="firstName" // Đặt name cho input
                onChange={handleChange}
              />
            </div>
            <div className="lname">
              <label>Last name</label>
              <br />
              <input
                type="text"
                //placeholder={state.lastName}
                value={state.lastName}
                name="lastName" // Đặt name cho input
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="email">
            <label>Email</label>
            <br />
            <input type="text" placeholder={email} disabled />
          </div>
        </div>
        <div className="profile-buttons">
          <button>Cancel</button>
          <button className="save" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileBox;
