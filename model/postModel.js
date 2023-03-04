const mongoose = require("mongoose");
// const User = require("./userModel");

const postSchema = mongoose.Schema(
  {
    post: [String],
    like: Number,
    comment: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post must have user"],
    },
    caption: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

postSchema.pre(/^find/, function (next) {
  this.populate("user");
  next();
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
