"use strict";
const controller = require('../controllers/ownedMountsController');
const express = require('express');
const router = express.Router();

router.get('/ownedMounts/:googleId', controller.getAllOwnedMountsByGoogleId);
router.post('/ownedMounts/:googleId', controller.addToOwnedMounts);
router.delete('/ownedMounts/:googleId/:mountId', controller.removeFromOwnedMounts);
router.get('/ownedMounts/check/:googleId/:mountId', controller.checkOwnedMount);

module.exports = router;
