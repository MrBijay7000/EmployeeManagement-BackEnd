const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");
const Task = require("../models/tasks-model");
const Leave = require("../models/leave-model");
const HttpError = require("../models/http-error");

exports.signUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;
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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Could not create user, please try again", 500);
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    image:
      "https://img.freepik.com/premium-vector/freelance-sticker-logo-icon-vector-man-with-desktop-blogger-with-laptop-icon-vector-isolated-background-eps-10_399089-1098.jpg",
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing in failed, please try again.", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Signing in failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
    role: createdUser.role,
    expiresIn: 3600,
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

  if (!existingUser) {
    const error = new HttpError(
      "Invalid Credentials, could not log you in",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, invalid Credentials",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid Credentials, could not log you in",
      401
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in failed, please try again.", 500);
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
    role: existingUser.role,
    expiresIn: 3600,
  });
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

exports.getUserById = async (req, res, next) => {
  const employeeId = req.params.eid;

  let user;
  try {
    user = await User.findById(employeeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find users",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find user for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ user: user.toObject({ getters: true }) });
};

exports.viewTask = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find({});
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
    task = await Task.findById(taskId);
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

exports.applyForLeave = async (req, res, next) => {
  const { employeeId, startDate, endDate, appliedDate, reason } = req.body;
  const appliedLeave = new Leave({
    employeeId,
    startDate,
    endDate,
    appliedDate,
    reason,
  });

  await appliedLeave.save().then((leave) => {
    const obj = {
      id: leave._id,
      employeeId: leave.employeeId,
      startDate: leave.startDate,
      endDate: leave.endDate,
      reason: leave.reason,
    };
    res.json({
      message: "Leave Applied",
      appliedLeave: obj,
    });
  });
};
