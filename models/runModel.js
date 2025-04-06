const mongoose = require("mongoose");

const runSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  routeData: { type: String, default: "Klaus Building" },
  totalTime: { type: Number, default: 0 },    // in seconds
  distance: { type: Number, default: 0 },     // in meters or km
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("runs", runSchema);
