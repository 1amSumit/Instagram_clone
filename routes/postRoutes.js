const express = require("express");
const authController = require("../controller/authController");
const postController = require("../controller/postController");

const router = express.Router();

router
  .route("/")
  .post(
    postController.upload,
    postController.resizeUploadPost,
    postController.post
  );

module.exports = router;
