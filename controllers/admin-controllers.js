const Admin = require("../models/admin-model");
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
