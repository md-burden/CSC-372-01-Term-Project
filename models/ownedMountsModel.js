"use strict";
const pool = require('./db');

async function getAllOwnedMountsByGoogleId(googleId) {
    const query = "SELECT * FROM owned_mounts WHERE \"google_id\" = $1";
    const values = [googleId];
    const result = await pool.query(query, values);
    return result.rows;
}

async function addToOwnedMounts(googleId, mountId) {
    const query = 'INSERT INTO owned_mounts ("google_id", "mount_id") VALUES ($1, $2) RETURNING *';
    const values = [googleId, mountId];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function removeFromOwnedMounts(googleId, mountId) {
    const query = 'DELETE FROM owned_mounts WHERE "google_id" = $1 AND "mount_id" = $2';
    const values = [googleId, mountId];
    await pool.query(query, values);
}

async function checkOwnedMount(googleId, mountId) {
    const query = 'SELECT * FROM owned_mounts WHERE "google_id" = $1 AND "mount_id" = $2';
    const values = [googleId, mountId];
    const result = await pool.query(query, values);
    return result.rows.length > 0;
}

module.exports = {
    getAllOwnedMountsByGoogleId,
    addToOwnedMounts,
    removeFromOwnedMounts,
    checkOwnedMount
};