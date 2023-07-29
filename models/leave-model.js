var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  appliedDate: { type: Date, required: true },
  duration: { type: Number, required: true },
  reason: { type: String, required: true, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Leave", LeaveSchema);
