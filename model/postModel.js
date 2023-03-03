const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  post: [String],
  like: Number,
  comment: String,
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "User",
  //   required: [true, "Every post must have user"],
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
