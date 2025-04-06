const mongoose = require("mongoose");

const runSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  routeData: [
    {
      lat: Number,
      lng: Number,
      timestamp: Date
    }
  ],
  totalTime: { type: Number, default: 0 }, // in seconds
  distance: { type: Number, default: 0 }, // in meters/kilometers
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Run", runSchema);
