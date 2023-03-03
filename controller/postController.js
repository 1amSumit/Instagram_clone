const catchAsync = require("../utils/catchAsync");
const Post = require("../model/postModel");
const multer = require("multer");
const sharp = require("sharp");
const AppError = require("../utils/AppError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else if (file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.resizeUploadPost = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  console.log(req.file);

  req.file.originalname = `post-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/users/${req.file.originalname}`);
  next();
});

exports.upload = upload.single("post");

exports.post = catchAsync(async (req, res, next) => {
  console.log(req.file);
  const post = await Post.create({ post: req.file.originalname });

  if (!post) return next(new AppError("No post", 400));

  res.status(200).json({
    status: "sucess",
    data: {
      post,
    },
  });
});
