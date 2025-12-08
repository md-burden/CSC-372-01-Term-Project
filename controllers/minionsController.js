"use strict";
const model = require('../models/minionsModel');

async function getAllMinions(req, res) {
    try {
        const minions = await model.getAllMinions();
        res.status(200).json(minions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMinionById(req, res) {
    const id = req.params.id;
    try {
        const minion = await model.getMinionById(id);
        res.status(200).json(minion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAllMinions, getMinionById };