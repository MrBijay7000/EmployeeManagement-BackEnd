const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "admin",
    required: true,
  },
});

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Admin", adminSchema);
