const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  hireDate: { type: Date },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
    default: "employee",
  },
  image: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
