import { useAuth } from "../../components/auth/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../../styles/profile-page.css";

function ProfilePage() {
  const { user, logout, selectedCharacterId, setSelectedCharacterId } =
    useAuth();
  const navigate = useNavigate();
  const [characterIds, setCharacterIds] = useState(user.characterIds || []);

  // 2. Define the logout event handler
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate("/login"); // Redirect to login page after logout completes
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const handleCharacterIdSelect = (characterId) => {
    setSelectedCharacterId(characterId);
    console.log("Character ID Selected:", characterId);
  };

  const handleCharacterIdInput = (event) => {
    const value = event.target.value;
    setSelectedCharacterId(value);
  };

  const handleAddCharacterId = (event) => {
    if (event.key === "Enter") {
      const id = selectedCharacterId.trim();
      if (id && !characterIds.includes(parseInt(id))) {
        const numericId = parseInt(id);
        if (!isNaN(numericId)) {
          setCharacterIds([...characterIds, numericId]);
          console.log("Character ID Added:", numericId);
        }
      }
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
