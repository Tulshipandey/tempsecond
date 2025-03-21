const Booking = require("../models/Booking");

// ✅ Create a new ride booking
const createBooking = async (req, res) => {
    try {
        const { rideType, pickupLocation, dropLocation, scheduledTime } = req.body;
        const userId = req.user.id; // Extracted from JWT

        const newBooking = new Booking({
            user: userId,
            rideType,
            pickupLocation,
            dropLocation,
            scheduledTime
        });

        await newBooking.save();
        res.status(201).json({ message: "Ride booked successfully!", booking: newBooking });
    } catch (error) {
        res.status(500).json({ error: "Error booking ride", details: error.message });
    }
};

// ✅ Get all user bookings
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching bookings" });
    }
};

// ✅ Cancel a booking
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ error: "Booking not found" });
        if (booking.user.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

        booking.status = "cancelled";
        await booking.save();

        res.status(200).json({ message: "Booking cancelled successfully!", booking });
    } catch (error) {
        res.status(500).json({ error: "Error cancelling booking" });
    }
};

module.exports = { createBooking, getUserBookings, cancelBooking };
