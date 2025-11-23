"user strict";
const model = require('../models/mountsModel');

async function getAllMounts(req, res) {
    try {
        const mounts = await model.getAllMounts();
        res.status(200).json(mounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMountById(req, res) {
    const id = req.params.id;
    try {
        const mount = await model.getMountById(id);
        res.status(200).json(mount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllMounts, getMountById };