import { useEffect, useState, Component } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";
import axios from "axios";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null, // Thông tin người dùng từ API
      error: null, // Lỗi nếu có
    };
  }

  componentDidMount() {
    // Gửi yêu cầu API để lấy thông tin người dùng khi component được mount
    axios
      .get("http://localhost:5000/users/list")
      .then((response) => {
        //console.log(response.data);
        this.setState({ userInfo: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { userInfo, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!userInfo) {
      return <div>Loading...</div>;
    }

    // Hiển thị thông tin người dùng từ API
    return (
      <div>
        <h1>User Profile</h1>
        <p>Name: {userInfo[0].name}</p>
        <p>Email: {userInfo[0].email}</p>
        <p>Password: {userInfo[0].password}</p>
      </div>
    );
  }
}

export default UserProfile;
