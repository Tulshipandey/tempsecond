const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: "MetroStation", required: true },
  slotNumber: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ["active", "completed", "cancelled"], default: "active" }
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
