import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signIn.css";
import Cookie from "universal-cookie";

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

    console.log(state);

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      setState({
        email: "",
        password: "",
      });

      const data = await response.json();
      //console.log(data);
      if (data.success == true) {
        const cookie = new Cookie();
        cookie.set("token", data.token, { path: "/" });
        cookie.set("isLogged", data.success, { path: "/" });
        //console.log(cookie);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
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
      <button type="submit">Sign In</button>
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
