const User = require("../models/user-model");
const Admin = require("../models/admin-model");
const Job = require("../models/jobs-model");
const Leave = require("../models/leave-model");
const HttpError = require("../models/http-error");

exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signing in failed", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing in failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({
    user: createdUser.toObject({
      getters: true,
    }),
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Logging in failed", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError(
      "Invalid Credentials, could not log you in",
      401
    );
    return next(error);
  }

  res.json({ message: "Logged in!" });
};

exports.getUsers = async (req, res, next) => {
  let users;

  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later",
      500
    );
    return next(error);
  }
  res.json({
    users: users.map((user) =>
      user.toObject({
        getters: true,
      })
    ),
  });
};

exports.viewTask = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Job.find({});
  } catch (err) {
    const error = new HttpError("Could not find the job", 500);
    return next(error);
  }
  res.json({
    tasks: tasks.map((task) =>
      task.toObject({
        getters: true,
      })
    ),
  });
};

exports.viewTaskById = async (req, res, next) => {
  const taskId = req.params.tid;

  let task;

  try {
    task = await User.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find task by this id",
      500
    );
    return next(error);
  }
  if (!task) {
    const error = new HttpError("Could not find task for this id", 404);
    return next(error);
  }
  res.json({ task: task.toObject({ getters: true }) });
};
