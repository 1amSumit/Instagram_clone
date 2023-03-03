const mongoose = require("mongoose");
const validator = require("validator");
// const crypto = require("crypto");
// const bcrypt = require("bcryptjs");

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
  followers: Number,
  following: Number,
  profilePhoto: String,
  photos: [String],
  password: {
    type: String,
    required: [true, "Every user must provide password"],
  },
  role: {
    type: String,
    default: "user",
  },
  confirmPassword: {
    type: String,
    required: [true, "Please provide confirm password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same",
    },
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
