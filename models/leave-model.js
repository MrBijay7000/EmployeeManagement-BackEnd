var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({
  employee: { type: Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  appliedDate: { type: Date, required: true },
  reason: { type: String, required: true },
});

module.exports = mongoose.model("Leave", LeaveSchema);
