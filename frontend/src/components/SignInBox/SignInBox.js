import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signIn.css";

function SignInBox() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    // Chuẩn bị dữ liệu để gửi lên API
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("https://example.com/api/signin", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      // Đặt lại trạng thái form sau khi submit thành công
      setState({
        email: "",
        password: "",
      });

      // Xử lý kết quả từ API nếu cần

      // Chuyển hướng hoặc thực hiện các hành động khác sau khi đăng nhập thành công
    } catch (error) {
      console.error("Error signing in:", error.message);
      // Xử lý lỗi nếu cần
    }
  };

  const handleSignIn = () => {
    navigate("/dashboard");
  };

  return (
    <form className="signIn-From" onSubmit={handleOnSubmit}>
      <h1>
        <span className="custom-span">Sign in to </span>{" "}
        <i className="fa-solid fa-house-laptop"></i> Smart Home
      </h1>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={state.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={state.password}
        onChange={handleChange}
      />
      <button type="submit" onClick={handleSignIn}>
        Sign In
      </button>
      <div className="cls-link">
        <span>Not a user?</span>{" "}
        <Link to="/signup" className="primary-link">
          Sign up
        </Link>
      </div>
    </form>
  );
}

export default SignInBox;
