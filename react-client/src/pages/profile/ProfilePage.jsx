import { useAuth } from "../../components/auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

import "../../styles/profile-page.css";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // 2. Define the logout event handler
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate("/login"); // Redirect to login page after logout completes
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div className="profile-page">
      <div id="profile-picture-section">
        <div id="picture">
          <img
            src="https://ffxivcollect.com/images/mounts/large/379.png"
            alt=""
          />
        </div>
        <div id="edit">Edit</div>
      </div>
      <div id="name-field">
        <h2>Name</h2>
        <input type="text" defaultValue={user.firstName} readOnly />
      </div>
      <div id="username-field">
        <h2>UserName</h2>
        <input type="text" defaultValue={user.displayName} readOnly />
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;
