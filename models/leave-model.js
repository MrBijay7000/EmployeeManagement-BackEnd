var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true, default: Date.now },
  endDate: { type: Date, required: true, default: Date.now },
  appliedDate: { type: Date, required: true, default: Date.now },
  reason: { type: String, required: true, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Leave", LeaveSchema);
