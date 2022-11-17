import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SessionsList from "./components/SessionsList";
import ConfirmSchedules from "./pages/ConfirmSchedules";
import Login from "./pages/Login";
import Sessions from "./pages/Sessions";
import UserProfile from "./pages/UserProfile";

function App() {
  useEffect(()=>{

  })
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/confirm-schedules" element={<ConfirmSchedules />} />
          <Route path="/confirm-schedules/:group_id" element={<SessionsList />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
