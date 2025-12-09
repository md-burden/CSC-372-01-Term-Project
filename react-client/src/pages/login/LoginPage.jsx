import { use, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "../../styles/login.css";
import "reactjs-popup/dist/index.css";

function LoginPage() {
  const nav = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";
  console.log("LoginPage: from =", from);
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_API_BASE_URL || "http://localhost:3000";

  const googleLoginUrl = `${BACKEND_URL}/auth/google?returnTo=` + from;

  return (
    <>
      <div id="login-page">
        <div id="banner">
          <h1>FFXIV Mounts & Minions</h1>
          <h2>
            Your personal collection journal for FFXIV's mounts and minions.
          </h2>
        </div>
        <div id="login-form">
          <p>You must log in to continue.</p>
          <a href={googleLoginUrl}>Login with Google</a>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
