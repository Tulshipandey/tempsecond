const mongoose = require("mongoose");

const ParkingSpotSchema = new mongoose.Schema({
  stationId: { type: mongoose.Schema.Types.ObjectId, ref: "MetroStation", required: true },
  totalSlots: { type: Number, required: true },
  availableSlots: { type: Number, required: true },
  pricePerHour: { type: Number, required: true }
});

module.exports = mongoose.model("ParkingSpot", ParkingSpotSchema);
