const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  // bestTimes could store a map of distance -> best time in seconds (or the best run ID)
  bestTimes: {
    type: Map,
    of: Number,
    default: {}
  },
  // additional fields as needed
});

module.exports = mongoose.model("users", userSchema);
