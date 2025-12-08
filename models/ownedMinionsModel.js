"use strict";
const { check } = require('zod');
const pool = require('./db');

async function getAllOwnedMinionsByGoogleId(googleId) {
    const query = "SELECT * FROM owned_minions WHERE \"google_id\" = $1";
    const values = [googleId];
    const result = await pool.query(query, values);
    return result.rows;
}

async function addToOwnedMinions(googleId, minionId) {
    const query = 'INSERT INTO owned_minions ("google_id", "minion_id") VALUES ($1, $2) RETURNING *';
    const values = [googleId, minionId];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function removeFromOwnedMinions(googleId, minionId) {
    const query = 'DELETE FROM owned_minions WHERE "google_id" = $1 AND "minion_id" = $2';
    const values = [googleId, minionId];
    await pool.query(query, values);
}

async function checkOwnedMinion(googleId, minionId) {
    const query = 'SELECT * FROM owned_minions WHERE "google_id" = $1 AND "minion_id" = $2';
    const values = [googleId, minionId];
    const result = await pool.query(query, values);
    return result.rows.length > 0;
}

module.exports = {
    getAllOwnedMinionsByGoogleId,
    addToOwnedMinions,
    removeFromOwnedMinions,
    checkOwnedMinion
};