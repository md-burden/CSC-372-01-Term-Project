import "../../styles/home.css";

import { useState, useEffect } from "react";
import GoalCardComponent from "../../components/GoalCardComponent.jsx";
import GoalService from "../../services/GoalService.jsx";
import { useAuth } from "../../components/auth/AuthContext.jsx";

function HomePage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        console.log("Fetching goals for user:", user);
        setLoading(true);
        const data = await GoalService.getIncompleteGoalsByGoogleId(
          user.googleId
        );
        setGoals(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (goals.length === 0) {
    return (
      <div id="no-goals">
        <p>No goals available. Add some goals to get started!</p>
      </div>
    );
  }

  return (
    <div id="home">
      <div id="goals">
        {goals.map((goal, index) => (
          <GoalCardComponent
            key={index}
            goal={goal}
            mountId={goal.creatureId}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
