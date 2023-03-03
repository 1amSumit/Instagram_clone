const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllUser = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  let queryObj = {};
  let rexExp;
  if (name) {
    rexExp = new RegExp(`^${name}`);
    queryObj = { name: rexExp };
  }
  const users = await User.find(queryObj);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError("No user found with this id", 400));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser)
    return next(new AppError("No user found with this id", 400));

  res.status(200).json({
    status: "success",
    data: {
      updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError("No user found with this id", 400));

  res.status(200).json({
    status: "success",
    data: null,
  });
});
