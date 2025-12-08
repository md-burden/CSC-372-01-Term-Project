import "../../styles/mounts-minions-pages.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MinionsService from "../../services/MinionsService";
import MountMinionCardComponent from "../../components/MountMinionCardComponent";
import { useAuth } from "../../components/auth/AuthContext.jsx";
import TYPE from "../../../config/enum.js";

function MinionsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [minions, setMinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMinions = async () => {
      try {
        setLoading(true);
        const data = await MinionsService.getAllMinion();
        setMinions(data.data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMinions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mounts-minions-page">
        {minions.map((minion, index) => (
          <MountMinionCardComponent
            key={index}
            type={TYPE.MINION}
            data={minion}
            googleId={user?.google_id}
            navigate={navigate}
          />
        ))}
      </div>
    </>
  );
}

export default MinionsPage;
