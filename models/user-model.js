const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
    default: "employee",
  },
  image: { type: String, required: true },
  // admin: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
