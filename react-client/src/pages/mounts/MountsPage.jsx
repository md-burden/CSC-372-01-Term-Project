import "../../styles/mounts-minions-pages.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MountsService from "../../services/MountsService";
import MountMinionCardComponent from "../../components/MountMinionCardComponent";
import { useAuth } from "../../components/auth/AuthContext.jsx";
import TYPE from "../../../config/enum.js";

function MountsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mounts, setMounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMounts = async () => {
      try {
        setLoading(true);
        const data = await MountsService.getAllMount();
        setMounts(data.data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMounts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="mounts-minions-page">
        {mounts.map((mount, index) => (
          <MountMinionCardComponent
            key={index}
            type={TYPE.MOUNT}
            data={mount}
            googleId={user?.googleId}
            navigate={navigate}
          />
        ))}
      </div>
    </>
  );
}

export default MountsPage;
