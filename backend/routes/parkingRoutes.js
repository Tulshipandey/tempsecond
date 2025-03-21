const express = require("express");
const { getParkingSlots, updateParkingSlot } = require("../controllers/parkingController");
const router = express.Router();

router.get("/", getParkingSlots);  // Get all parking slots
router.put("/:slotId", updateParkingSlot); // Update a slot’s status

module.exports = router;
