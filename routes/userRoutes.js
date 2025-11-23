"use strict";
const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/user/:googleId", userController.fetchUserById);
router.post("/user", userController.createUser);
router.delete("/user/:googleId", userController.removeUser);

module.exports = router;