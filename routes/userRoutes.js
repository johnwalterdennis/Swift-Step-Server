// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// POST /users - Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, bestTimes } = req.body;
    // Create a new user document
    const newUser = new User({
      username,
      email
       ,bestTimes // e.g. {"5": 1600} meaning best 5k in 1600s (26:40)
    });
    await newUser.save();
    
    return res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
