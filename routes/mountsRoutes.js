"use strict";
const express = require('express');
const router = express.Router();
const MountsController = require('../controllers/mountsController');

router.get('/mounts', MountsController.getAllMounts);
router.get('/mounts/:id', MountsController.getMountById);

module.exports = router;