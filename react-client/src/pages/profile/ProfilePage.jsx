import { useAuth } from "../../components/auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../../styles/profile-page.css";

function ProfilePage() {
  const { user, logout } =
    useAuth();
  const navigate = useNavigate();
  const [characterIds, setCharacterIds] = useState(user.characterIds || []);

  // 2. Define the logout event handler
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate("/"); // Redirect to login page after logout completes
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  console.log("User characterIds:", user.characterIds);
  console.log("Local characterIds state:", characterIds);

  return (
    <div className="profile-page">
      <div id="name-field">
        <h2>Name</h2>
        <input type="text" defaultValue={user.first_name} readOnly />
      </div>
      <div id="username-field">
        <h2>UserName</h2>
        <input type="text" defaultValue={user.display_name} readOnly />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
