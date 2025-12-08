"use strict";
const express = require('express');
const router = express.Router();
const MinionsController = require('../controllers/minionsController');

router.get('/minions', MinionsController.getAllMinions);
router.get('/minions/:id', MinionsController.getMinionById);

module.exports = router;