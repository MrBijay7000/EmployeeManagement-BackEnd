const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  taskgivendate: { type: Date, required: true, default: Date.now },
  // status: {
  //   type: String,
  //   enum: ["Not started", "In progress", "Completed"],
  //   default: "Not started",
  // },
});

module.exports = mongoose.model("Task", taskSchema);
