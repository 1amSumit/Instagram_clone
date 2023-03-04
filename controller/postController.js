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

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.setUserIds = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.post = catchAsync(async (req, res, next) => {
  const filterbody = filterObj(req.body, "like", "comment", "user");
  if (req.file) filterbody.post = req.file.originalname;
  console.log(filterbody);
  const post = await Post.create(filterbody);

  if (!post) return next(new AppError("No post", 400));

  res.status(200).json({
    status: "sucess",
    data: {
      post,
    },
  });
});

exports.getAllPost = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: "success",
    results: posts.length,
    data: {
      posts,
    },
  });
});
