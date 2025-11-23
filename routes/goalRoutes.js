"use strict";
const goalController = require("../controllers/goalController");
const express = require("express");
const router = express.Router();

router.get("/goals/:googleId", goalController.fetchAllGoalsByGoogleId);
router.get("/goals/incomplete/:googleId", goalController.fetchIncompleteGoalsByGoogleId);
router.post("/goals/:googleId", goalController.createGoal);
router.delete("/goals/:goalId", goalController.deleteGoal);
router.put("/goals/complete/:goalId", goalController.completeGoal); 
router.put("/goals/:goalId", goalController.updateGoal);

module.exports = router;