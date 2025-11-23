const pool = require('./db');

async function getUserById(googleId) {
    const queryText = 'SELECT * FROM users WHERE "googleId" = $1';
    const values = [googleId];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function createNewUser([googleId, firstName, lastName, email, displayName, characterIds]) {
    let queryText = 'INSERT INTO users ("googleId", "firstName", "lastName", "email", "characterIds", "displayName") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    let values = [googleId, firstName, lastName, email, characterIds, displayName];
    const result = await pool.query(queryText, values);
    return result.rows[0];
}

async function deleteUser(id) {
    let queryText = "DELETE FROM users WHERE id = $1";
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rowCount;
}

module.exports = {
    getUserById,
    createNewUser,
    deleteUser
};