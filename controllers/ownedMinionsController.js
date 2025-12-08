"use strict";
const model = require("../models/ownedMinionsModel");

async function getAllOwnedMinionsByGoogleId(req, res) {
  const googleId = req.params.googleId;
  if (googleId) {
    try {
      const ownedMinions = await model.getAllOwnedMinionsByGoogleId(googleId);
      res.json(ownedMinions);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId parameter");
  }
}

async function addToOwnedMinions(req, res) {
  if(req.body == null) {
    res.status(400).send("Missing request body");
    return;
  }

  const googleId = req.params.googleId;
  const minionId = req.body.minion_id;
  if (googleId && minionId) {
    try {
      const newOwnedMinion = await model.addToOwnedMinions(googleId, minionId);
      res.status(201).json(newOwnedMinion);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId parameter or minionId in body");
  }
}

async function removeFromOwnedMinions(req, res) {
  const googleId = req.params.googleId;
  const minionId = req.params.minionId;
  if (googleId && minionId) {
    try {
      await model.removeFromOwnedMinions(googleId, minionId);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId or minionId parameter");
  }
}

async function checkOwnedMinion(req, res) {
  const googleId = req.params.googleId;
  const minionId = req.params.minionId;
  if (googleId && minionId) {
    try {
      const isOwned = await model.checkOwnedMinion(googleId, minionId);
      res.json({ owned: isOwned });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId or minionId parameter");
  }
}

module.exports = {
  getAllOwnedMinionsByGoogleId,
  addToOwnedMinions,
  removeFromOwnedMinions,
  checkOwnedMinion,
};
