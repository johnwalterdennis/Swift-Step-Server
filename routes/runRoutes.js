const express = require("express");
const router = express.Router();
const Run = require("../models/runModel");
const User = require("../models/userModel");

// Start a new run (optional endpoint)
    router.post("/start", async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) return res.status(404).json({ error: "No userId inputed" });
        const newRun = new Run({ userId });
        await newRun.save();
        return res.json({ message: "Run started", runId: newRun._id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server Error" });
    }
    });

    // router.post("/update/:runId", async (req, res) => {
    // try {
    //     const { runId } = req.params;
    //     const run = await Run.findById(runId);
    //     if (!run) return res.status(404).json({ error: "Run not found" });

    //     run.routeData.push({ lat, lng, timestamp: new Date() });
    //     await run.save();

    //     return res.json({ message: "Location data added" });
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ error: "Server Error" });
    // }
    // });

    router.post("/finish/", async (req, res) => {
        try {
          const { runId, totalTime, distance } = req.body;
      
          const run = await Run.findById(runId);
          if (!run) return res.status(404).json({ error: "Run not found" });
      
          run.totalTime = totalTime;
          run.distance = distance;
          await run.save();
      
          // Check if it's a new best for that distance
          const user = await User.findById(run.userId);
          if (!user) return res.status(404).json({ error: "User not found" });
          else if (user) {
            if (!user.bestTime || totalTime < user.bestTime) {
                user.bestTime = totalTime;
                await user.save();
              }
          }
      
          return res.json({ message: "Run finished", run });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Server Error" });
        }
      });

      router.get("/ghost", async (req, res) => {
        try {
          const { userId } = req.body;
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
      
          // Return the user’s single bestTime, or null if it's undefined
          const bestTime = user.bestTimes;
          return res.json({ ghostTime: bestTime });
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "Server Error" });
        }
      });
      
      module.exports = router;