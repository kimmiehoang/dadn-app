import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./utils-component/protectedRoute";
import UserProfile from "./components/UserProfile";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import "./app.css";

export default function App() {
  const isLoggedIn = false;

  return (
    <BrowserRouter>
      <Routes>
        {/*<Route index element={<LogIn />} />
          {/* General 
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} /> 
          element={
              <Protected isLoggedIn={isLoggedIn} isAdmin={false}>
                <UserProfile />
              </Protected>
            }
          */}
        <Route index element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userProfile" element={<UserProfile />} />

        {/* handle error */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
