const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  name: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Every follower and following must have user"],
  },
});

const Follow = new mongoose.model("Follower", followSchema);

module.exports = Follow;
