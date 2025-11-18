import "./styles/main.css";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import BannerComponent from "./components/BannerComponent.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import MountsPage from "./pages/mounts/MountsPage.jsx";
import MinionsPage from "./pages/minions/MinionsPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/" && <BannerComponent />}
      <div className="app-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/mounts" element={<MountsPage />} />
          <Route path="/minions" element={<MinionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
