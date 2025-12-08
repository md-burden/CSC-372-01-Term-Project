import { useAuth } from "../../components/auth/AuthContext.jsx";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

import "../../styles/my-collection.css";
import OwnedMountsService from "../../services/OwnedMountsService.jsx";
import OwnedMinionsService from "../../services/OwnedMinionsService.jsx";
import MountsService from "../../services/MountsService.jsx";
import MinionsService from "../../services/MinionsService.jsx";
import MountMinionCardComponent from "../../components/MountMinionCardComponent.jsx";
import TYPE from "../../../config/enum.js";

function MyCollection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ownedMounts, setOwnedMounts] = useState([]);
  const [ownedMinions, setOwnedMinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
    const fetchOwnedCollection = async () => {
      try {
        setLoading(true);
        const ownedMountsData = await OwnedMountsService.getOwnedMountsByGoogleId(
          user.google_id
        );

        const ownedMinionsData = await OwnedMinionsService.getOwnedMinionsByGoogleId(
          user.google_id
        );

        const ownedMountsArray = ownedMountsData.data || [];
        const ownedMinionsArray = ownedMinionsData.data || [];

        const mountDetailsPromises = ownedMountsArray.map(async (ownedMount) => {
          const mountDetails = await MountsService.getMountById(ownedMount.mount_id);
          return mountDetails.data;
        });

        const minionDetailsPromises = ownedMinionsArray.map(async (ownedMinion) => {
          const minionDetails = await MinionsService.getMinionById(ownedMinion.minion_id);
          return minionDetails.data;
        });

        const mountsWithDetails = await Promise.all(mountDetailsPromises);
        const minionsWithDetails = await Promise.all(minionDetailsPromises);

        setOwnedMounts(mountsWithDetails);
        setOwnedMinions(minionsWithDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedCollection();
  }, [user.google_id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
    <div id="my-collection-page">
      <h2>My Collection</h2>
        <div className="collection-section">
            <h3>Owned Mounts</h3>
            <div className="collection-grid">
                {ownedMounts.length === 0 ? (
                    <p>You don't own any mounts yet.</p>
                ) : (
                    ownedMounts.map((mount, index) => (
                        <MountMinionCardComponent
                            key={index}
                            type={TYPE.MOUNT}
                            data={mount}
                            googleId={user?.google_id}
                            navigate={navigate}
                            isCollectionPage={true}
                        />
                    ))
                )}
            </div>
        </div>
        <div className="collection-section">
            <h3>Owned Minions</h3>
            <div className="collection-grid">
                {ownedMinions.length === 0 ? (
                    <p>You don't own any minions yet.</p>
                ) : (
                    ownedMinions.map((minion, index) => (
                        <MountMinionCardComponent
                            key={index}
                            type={TYPE.MINION}
                            data={minion}
                            googleId={user?.google_id}
                            navigate={navigate}
                            isCollectionPage={true}
                        />
                    ))
                )}
            </div>
        </div>
    </div>
  );
}

export default MyCollection;