const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// POST /users - Create a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, bestTimes } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already taken" });
      }
  
    // Create a new user document
    const newUser = new User({
      username,
      email,
      password,
      bestTimes
    });
    await newUser.save();
    
    return res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
      });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
    try {
      const { username, email, password } = req.body;
  
      // Find user by username or email
      let user = null;
      if (username) {
        user = await User.findOne({ username });
      } else if (email) {
        user = await User.findOne({ email });
      }
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      
      if (user.password !== password) {
        return res.status(401).json({ error: "Invalid password" });
      }
  
      return res.json({
        message: "Login successful",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        }
      });
    } catch (err) {
      console.error("Error logging in user:", err);
      return res.status(500).json({ error: "Server error" });
    }
  });
module.exports = router;
