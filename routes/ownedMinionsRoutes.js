"use strict";
const controller = require('../controllers/ownedMinionsController');
const express = require('express');
const router = express.Router();

router.get('/ownedMinions/:googleId', controller.getAllOwnedMinionsByGoogleId);
router.get('/ownedMinions/check/:googleId/:minionId', controller.checkOwnedMinion);
router.post('/ownedMinions/:googleId', controller.addToOwnedMinions);
router.delete('/ownedMinions/:googleId/:minionId', controller.removeFromOwnedMinions);

module.exports = router;