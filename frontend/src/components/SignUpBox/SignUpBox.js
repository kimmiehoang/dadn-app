import { useState } from "react";
import { Link } from "react-router-dom";
import "./signUp.css";

function SignUpBox() {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
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

    const { email, password, confirmPassword } = state;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch("https://example.com/api/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to sign in");
      }

      setState({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <form className="signUp-From" onSubmit={handleOnSubmit}>
      <h1>
        <span className="custom-span">Sign up to </span>{" "}
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
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={state.confirmPassword}
        onChange={handleChange}
      />
      <button type="submit">Sign Up</button>
      <div className="cls-link">
        <span>Already a member?</span>{" "}
        <Link to="/signin" className="primary-link">
          Sign in
        </Link>
      </div>
    </form>
  );
}

export default SignUpBox;
