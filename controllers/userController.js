"use strict";
const model = require("../models/userModel");

async function fetchUserById(req, res) {
    const googleId = req.params.googleId;
    if (googleId) {
        try {
            const user = await model.getUserById(googleId);
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }   
}

async function removeUser(req, res) {
    const googleId = req.params.googleId;
    if (googleId) {
        try {
            const deletedCount = await model.deleteUser(googleId);    
            if (deletedCount > 0) {
                res.send(`User with id ${googleId} deleted successfully.`);
            } else {
                res.status(404).send("User not found.");
            }
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required id param!");
    }
}

async function createUser(req, res) {
    const { name, email, password } = req.body; 
    if (name && email && password) {
        try {
            const newUser = await model.addUser(name, email, password);
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    } else {
        res.status(400).send("Missing required user fields!");
    }
}

module.exports = {
    fetchUserById,
    createUser,
    removeUser
};