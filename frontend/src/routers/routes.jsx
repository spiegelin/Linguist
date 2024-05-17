// routes.jsx
import { Routes, Route, Navigate} from "react-router-dom";
import { Home } from "../pages/Home";
import { Notifications } from "../pages/Notifications";
import { Profile } from "../pages/Profile";
import { Lenguaje_Page } from "../pages/Lenguaje_Page";
import { ChatAppScreen } from "../pages/ChatAppScreen";
import { ConfigProfile } from "../pages/ConfigProfile";
import { LoginPage } from "../pages/LoginPage";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Notifications" element={<Notifications />} />
      <Route path="/Lenguaje_Page" element={<Lenguaje_Page />} />
      <Route path="/ChatAppScreen" element={<ChatAppScreen />} />
      <Route path="/ConfigProfile" element={<ConfigProfile />} />
    </Routes>
  );
};