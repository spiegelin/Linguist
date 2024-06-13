// routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Notifications } from "../pages/Notifications";
import { Profile } from "../pages/Profile";
import { Lenguaje_Page } from "../pages/Lenguaje_Page";
import { ChatAppScreen } from "../pages/ChatAppScreen";
import { ConfigProfile } from "../pages/ConfigProfile";
import { LoginPage } from "../pages/LoginPage";
import { LandingPage } from "../pages/LandingPage";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from '../components/PublicRoute';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Landing" />} />
      <Route path="*" element={<Navigate to="/Landing" />} />
      <Route path="/Landing" element={<PublicRoute element={<LandingPage />} />} />
      <Route path="/Login" element={<PublicRoute element={<LoginPage />} />} />
      <Route path="/Profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="/Notifications" element={<ProtectedRoute element={<Notifications />} />} />
      <Route path="/Lenguaje_Page" element={<ProtectedRoute element={<Lenguaje_Page />} />} />
      <Route path="/ChatAppScreen" element={<ProtectedRoute element={<ChatAppScreen />} />} />
      <Route path="/ConfigProfile" element={<ProtectedRoute element={<ConfigProfile />} />} />
    </Routes>
  );
};
