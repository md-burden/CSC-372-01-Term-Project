import "./styles/main.css";

import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProtectedLayout from "./components/auth/ProtectedLayout.jsx";
import BannerComponent from "./components/BannerComponent.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import MyCollection from "./pages/my-collection/MyCollection.jsx";
import MountsPage from "./pages/mounts/MountsPage.jsx";
import MinionsPage from "./pages/minions/MinionsPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import { AuthProvider } from "./components/auth/AuthContext.jsx";
import { StrictMode } from "react";

function App() {
  return (
    <StrictMode>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </StrictMode>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <>
      <BannerComponent />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/mounts" element={<MountsPage />} />
            <Route path="/minions" element={<MinionsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/my-collection" element={<MyCollection />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
