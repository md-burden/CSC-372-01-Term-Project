"use strict";
const express = require("express");
const app = express();

// CORS must come early, before other middleware
const cors = require("cors");
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
require("./auth/passport");
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const mountsRoutes = require("./routes/mountsRoutes");
const minionsRoutes = require("./routes/minionsRoutes");
const userRoutes = require("./routes/userRoutes");
const goalRoutes = require("./routes/goalRoutes");
const ownedMinionsRoutes = require("./routes/ownedMinionsRoutes");
const ownedMountsRoutes = require("./routes/ownedMountsRoutes");

app.use("/api", goalRoutes);
app.use("/api", mountsRoutes);
app.use("/api", minionsRoutes);
app.use("/api", ownedMinionsRoutes);
app.use("/api", ownedMountsRoutes);
app.use("/users", userRoutes);
app.use("/auth", require("./auth/authRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT + "!");
});
