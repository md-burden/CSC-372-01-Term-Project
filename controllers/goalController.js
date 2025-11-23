"use strict";
const model = require("../models/goalModel");

async function fetchAllGoalsByGoogleId(req, res) {
    const googleId = req.params.googleId;
    if (googleId) {
        try {
            const goals = await model.getAllByGoogleId(googleId);
            res.json(goals);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing googleId parameter");
    }
}

async function fetchIncompleteGoalsByGoogleId(req, res) {
    const googleId = req.params.googleId;
    if (googleId) {
        try {
            const goals = await model.getIncompleteGoalsByGoogleId(googleId);
            res.json(goals);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing googleId parameter");
    }
}

async function createGoal(req, res) {
    const googleId = req.params.googleId;
    const goal = req.body;
    if (googleId && goal) {
        try {
            goal.googleId = googleId;
            const newGoal = await model.createGoal(googleId, goal);
            res.status(201).json(newGoal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing googleId parameter or goal data");
    }
}

async function deleteGoal(req, res) {
    const goalId = req.params.goalId;
    if (goalId) {
        try {
            await model.deleteGoal(goalId);
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing goalId parameter");
    }
}

async function completeGoal(req, res) {
    const goalId = req.params.goalId;
    if (goalId) {
        try {
            const updatedGoal = await model.completeGoal(goalId);
            res.json(updatedGoal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing goalId parameter");
    }
}

async function updateGoal(req, res) {
    const goalId = req.params.goalId;
    const updates = req.body;
    if (goalId && updates) {
        try {
            const updatedGoal = await model.updateGoal(goalId, updates);
            res.json(updatedGoal);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing goalId parameter or update data");
    }
}

module.exports = {
    fetchAllGoalsByGoogleId,
    fetchIncompleteGoalsByGoogleId,
    createGoal,
    deleteGoal,
    completeGoal,
    updateGoal,
};