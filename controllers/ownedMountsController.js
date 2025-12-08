"use strict";
const model = require("../models/ownedMountsModel");

async function getAllOwnedMountsByGoogleId(req, res) {
  const googleId = req.params.googleId;
  if (googleId) {
    try {
      const ownedMounts = await model.getAllOwnedMountsByGoogleId(googleId);
      res.json(ownedMounts);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId parameter");
  }
}

async function addToOwnedMounts(req, res) {
  if (req.body == null) {
    res.status(400).send("Missing request body");
    return;
  }

  const googleId = req.params.googleId;
  const mountId = req.body.mount_id;
  console.log("Adding mount:", mountId, "to googleId:", googleId);
  if (googleId && mountId) {
    try {
      const newOwnedMount = await model.addToOwnedMounts(googleId, mountId);
      res.status(201).json(newOwnedMount);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId parameter or mountId in body");
  }
}

async function removeFromOwnedMounts(req, res) {
  const googleId = req.params.googleId;
  const mountId = req.params.mountId;
  if (googleId && mountId) {
    try {
      await model.removeFromOwnedMounts(googleId, mountId);
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId or mountId parameter");
  }
}

async function checkOwnedMount(req, res) {
  const googleId = req.params.googleId;
  const mountId = req.params.mountId;
  if (googleId && mountId) {
    try {
      const ownedMounts = await model.getAllOwnedMountsByGoogleId(googleId);
      const isOwned = await model.checkOwnedMount(googleId, mountId);
      res.json({ owned: isOwned });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  } else {
    res.status(400).send("Missing googleId parameter or mountId in body");
  }
}

module.exports = {
  getAllOwnedMountsByGoogleId,
  addToOwnedMounts,
  removeFromOwnedMounts,
    checkOwnedMount,
};
