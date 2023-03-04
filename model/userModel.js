const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

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
  followers: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
  profilePhoto: String,
  photos: [String],
  password: {
    type: String,
    required: [true, "Every user must provide password"],
  },
  bio: {
    type: String,
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

userSchema.pre("save", async function (next) {
  //checking if the password field is modified or not

  if (!this.isModified("password")) return next();
  //Encrypting password using bcrypt
  this.password = await bcrypt.hash(this.password, 12);

  //deleting confirm password from user database
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = +(this.passwordChangedAt.getTime() / 1000);
    return JWTTimeStamp < changeTimeStamp;
  }
  return false;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
