const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    distance: { type: Number, required: true },  // Distance in km
    baseFare: { type: Number, default: 50 },  // Base price
    surgeMultiplier: { type: Number, default: 1 },  // Surge factor
    totalFare: { type: Number, required: true },
    status: { type: String, enum: ["pending", "ongoing", "completed"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ride", RideSchema);
