import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Protected = ({ isLoggedIn, isAdmin, children }) => {
  const cookies = new Cookies();
  if (cookies.get("isLogged") === true) isLoggedIn = true;
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/" />;
};

export default Protected;
