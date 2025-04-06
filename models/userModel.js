const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  bestTimes: { type: Number, default: 0 },
});

module.exports = mongoose.model("users", userSchema);
