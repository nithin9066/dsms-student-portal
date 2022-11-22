import { useEffect } from "react";
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SessionsList from "./pages/SessionsList";
import ConfirmSchedules from "./pages/ConfirmSchedules";
import Login from "./pages/Login";
import Schedules from "./pages/Schedules";
import UserProfile from "./pages/UserProfile";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import OtpVeification from "./pages/OtpVeification";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification/:user_id/:username" element={<OtpVeification />} />
        <Route element={<RequireAuth />}>
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/confirm-schedules" element={<ConfirmSchedules />} />
          <Route path="/confirm-schedules/:group_id" element={<SessionsList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function RequireAuth() {
  let location = useLocation();

  if (!sessionStorage.getItem('user')) {

    return <Navigate to="/" state={{ from: location }} />;
  }

  return <Outlet />;
}