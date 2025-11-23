const { ca } = require('zod/v4/locales');
const pool = require('./db');

const getAllByGoogleId = async (googleId) => {
  try {
    const queryText = 'SELECT * FROM goals WHERE "googleId" = $1';
    const values = [googleId];
    const results = await pool.query(queryText, values);
    return results.rows;
  } catch (error) {
    throw new Error(`Error fetching goals: ${error.message}`);
  }
};

const getIncompleteGoalsByGoogleId = async (googleId) => {
  try {
    const queryText = 'SELECT * FROM goals WHERE "googleId" = $1 AND complete = FALSE';
    const values = [googleId];
    const results = await pool.query(queryText, values);
    return results.rows;
  } catch (error) {
    throw new Error(`Error fetching incomplete goals: ${error.message}`);
  }
};

const createGoal = async (googleId, goal) => {
  try {
    const queryText = `INSERT INTO goals ("googleId", "goalName", "creatureType", "creatureId", "notes") VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [googleId, goal.goalName, goal.creatureType, goal.creatureId, goal.notes];
    const result = await pool.query(queryText, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating goal: ${error.message}`);
  }
};

const deleteGoal = async (goalId) => {
  try {
    const queryText = 'DELETE FROM goals WHERE id = $1';
    const values = [goalId];
    await pool.query(queryText, values);
  } catch (error) {
    throw new Error(`Error deleting goal: ${error.message}`);
  }
};

const completeGoal = async (goalId) => {
  try {
    const queryText = 'UPDATE goals SET complete = TRUE WHERE id = $1 RETURNING *';
    const values = [goalId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error completing goal: ${error.message}`);
  }
};

const updateGoal = async (goalId, updates) => {
  try{
    const fields = [];
    const values = [];
    let index = 1;
    for (const key in updates) {
      fields.push(`"${key}" = $${index}`);
      values.push(updates[key]);
      index++;
    }
    values.push(goalId);
    const queryText = `UPDATE goals SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
    const result = await pool.query(queryText, values);
    return result.rows[0];
  }
  catch (error) {
    throw new Error(`Error updating goal: ${error.message}`);
  }
}

module.exports = {
  getAllByGoogleId,
  getIncompleteGoalsByGoogleId,
  createGoal,
  deleteGoal,
  completeGoal,
  updateGoal,
};