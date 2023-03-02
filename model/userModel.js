const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Every user must have name"],
  },
  email: {
    type: String,
    required: [true, "Every user must hvae email"],
    unique: true,
    validate: [validator.isEmail, "Please provide correct email id"],
  },
  password: {
    type: String,
    required: [true, "Every user must provide password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide confirm password"],
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const USER = new mongoose.model("USER", userSchema);

module.exports = USER;
