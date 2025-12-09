import axios from "axios";

const GOALS_API_BASE_URL = (import.meta.env.VITE_BACKEND_API_BASE_URL || "http://localhost:3000") + "/api/goals";

class GoalService {
  getAllGoalsByGoogleId(googleId) {
    return axios.get(`${GOALS_API_BASE_URL}/${googleId}`);
  }

  getIncompleteGoalsByGoogleId(googleId) {
    return axios.get(`${GOALS_API_BASE_URL}/incomplete/${googleId}`);
  }

  createGoal(googleId, goalName, notes, creatureId, creatureType) {
    const goal = {
      goal_name: goalName,
      notes: notes,
      creature_id: creatureId,
      creature_type: creatureType,
    };
    return axios.post(`${GOALS_API_BASE_URL}/${googleId}`, goal);
  }

  completeGoal(goalId) {
    return axios.put(`${GOALS_API_BASE_URL}/complete/${goalId}`);
  }

  deleteGoal(goalId) {
    return axios.delete(`${GOALS_API_BASE_URL}/${goalId}`);
  }

  updateGoal(goalId, goalName, notes) {
    const updatedGoal = {
      goal_name: goalName,
      notes: notes,
    };
    return axios.put(`${GOALS_API_BASE_URL}/${goalId}`, updatedGoal);
  }
}

export default new GoalService();
