const Admin = require("../models/admin-model");
const Task = require("../models/tasks-model");
const User = require("../models/user-model");
const Leave = require("../models/leave-model");
const HttpError = require("../models/http-error");

exports.getAdminUser = async (req, res, next) => {
  let users;
  try {
    users = await Admin.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching admin user failed, please try again later",
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

exports.createTask = async (req, res, next) => {
  const { title, description, startDate, endDate, status } = req.body;
  const task = new Task({
    title,
    description,
    startDate,
    endDate,
    status,
  });

  await task.save().then((task) => {
    const obj = {
      id: task._id,
      title: task.title,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
      status: task.status,
    };

    res.json({
      message: "Task Created",
      createdTasks: obj,
    });
  });
};

exports.deleteTask = async (req, res, next) => {
  const taskId = req.params.tid;

  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete task",
      500
    );
    return next(error);
  }

  if (!task) {
    const error = new HttpError("Could not find job details for this id", 404);
    return next(error);
  }

  try {
    task = await Task.deleteOne(taskId).then((result) => {
      res.status(200).json({
        message: "Delete Successfully!",
      });
    });
  } catch (err) {
    const error = new HttpError(
      "Something went wrongs, could not delete place",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Task deleted." });
};

exports.viewAllEmployes = async (req, res, next) => {
  let users;
  try {
    users = await User.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching employee failed, please try again later",
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

exports.viewEmployeById = async (req, res, next) => {
  const employeeId = req.params.eid;

  let employee;

  try {
    employee = await User.findById(employeeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find employee by this id",
      500
    );
    return next(error);
  }
  if (!employee) {
    const error = new HttpError("Could not find employee for this id", 404);
    return next(error);
  }
  res.json({ employee: employee.toObject({ getters: true }) });
};

exports.createEmployee = async (req, res, next) => {
  const { name, email, password } = req.body;

  const createdEmployes = new User({
    name,
    email,
    password,
  });
  try {
    await createdEmployes.save();
  } catch (err) {
    const error = new HttpError(
      "Creating employee failed, please try again.",
      500
    );
    return next(error);
  }
  res.status(201).json({ employes: createdEmployes });
};

exports.viewAllLeave = async (req, res, next) => {
  let users;
  try {
    users = await Leave.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching leave failed, please try again later",
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
