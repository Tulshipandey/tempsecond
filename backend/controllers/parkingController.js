const ParkingSlot = require("../models/ParkingSlot");

// Get all parking slots
const getParkingSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching parking slots" });
  }
};

// Update parking slot status (check-in/check-out)
const updateParkingSlot = async (req, res) => {
  const { slotId } = req.params;
  const { status } = req.body;

  try {
    const slot = await ParkingSlot.findByIdAndUpdate(
      slotId,
      { status, lastUpdated: Date.now() },
      { new: true }
    );

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    res.json(slot);
  } catch (err) {
    res.status(500).json({ message: "Error updating slot status" });
  }
};

module.exports = { getParkingSlots, updateParkingSlot };
