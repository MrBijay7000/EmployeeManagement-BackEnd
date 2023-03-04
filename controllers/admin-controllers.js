const Admin = require("../models/admin-model");
const Job = require("../models/jobs-model");
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
  const { title, description, startDate, endDate } = req.body;
  const task = new Job({
    title,
    description,
    startDate,
    endDate,
  });

  task.save().then((task) => {
    const obj = {
      id: task._id,
      title: task.title,
      description: task.description,
      startDate: task.startDate,
      endDate: task.endDate,
    };

    res.json({
      message: "Task Created",
      createdTasks: obj,
    });
  });
};

exports.deleteTask = async (req, res, next) => {
  const jobId = req.params.jid;

  let job;
  try {
    job = await Job.findById(jobId);
  } catch (err) {
    const error = new HttpError(
      "Something wentt wrong, could not delete place",
      500
    );
    return next(error);
  }

  if (!job) {
    const error = new HttpError("Could not find job details for this id", 404);
    return next(error);
  }

  try {
    job = Job.deleteOne(jobId).then((result) => {
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
  res.status(200).json({ message: "Deleted place." });
};
