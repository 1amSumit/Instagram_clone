const express = require("express");
const authController = require("../controller/authController");
const postController = require("../controller/postController");

const router = express.Router();

router.use(authController.protect);

router
  .route("/")
  .post(
    postController.upload,
    postController.resizeUploadPost,
    postController.setUserIds,
    postController.post
  )
  .get(postController.getAllPost);

module.exports = router;
