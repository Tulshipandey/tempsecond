const mongoose = require("mongoose");

const MetroStationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: { type: { lat: Number, lng: Number }, required: true },
  parkingAvailable: { type: Boolean, default: false }
});

module.exports = mongoose.model("MetroStation", MetroStationSchema);
