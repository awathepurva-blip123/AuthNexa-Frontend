import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* First Image: Welcome Page */}
        <Route path="/" element={<Home />} />

        {/* Second Image: Create Account Page */}
        <Route path="/signup" element={<Signup />} />

        {/* Third Image: Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Fourth Image: Reset Password Page */}
        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />
       
        {/* Fivth Image: New Password */}
        <Route
          path="/reset-new-password"
          element={<NewPassword />}
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes >
    </>
  );
}

export default App;