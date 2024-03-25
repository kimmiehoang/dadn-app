import "./styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./utils-component/protectedRoute";
import UserProfile from "./component/UserProfile";

export default function App() {
  const isLoggedIn = false;

  return (
    <div className="App">
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

          <Route path="/userProfile" element={<UserProfile />} />

          {/* handle error */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
