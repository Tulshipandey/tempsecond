const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();
const Ride = require("../models/Ride");


// Create a new booking (supports pooling)
router.post("/", async (req, res) => {
    try {
        const { userId, pickupLocation, dropoffLocation, rideType, scheduledTime, pooling } = req.body;

        let assignedBooking = null;

        if (pooling) {
            // Check if there is an existing shared ride available
            assignedBooking = await Booking.findOne({
                pickupLocation,
                dropoffLocation,
                rideType,
                status: "pending",
                pooling: true,
                passengers: { $lt: 4 } // Max 4 passengers per shared ride
            });

            if (assignedBooking) {
                // Add the user to existing shared ride
                assignedBooking.passengers.push(userId);
                await assignedBooking.save();
            }
        }

        if (!assignedBooking) {
            // Create a new booking if no shared ride is found
            assignedBooking = new Booking({
                userId,
                pickupLocation,
                dropoffLocation,
                rideType,
                scheduledTime: scheduledTime ? new Date(scheduledTime) : null,
                pooling,
                passengers: pooling ? [userId] : []
            });

            await assignedBooking.save();
        }

        res.status(201).json({ message: "Booking created successfully!", booking: assignedBooking });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// Get upcoming scheduled rides
router.get("/scheduled/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        
        console.log("Fetching rides for user:", userId);
        
        // Ensure userId is converted to ObjectId
        const upcomingRides = await Booking.find({
            userId: mongoose.Types.ObjectId(userId),
            scheduledTime: { $gte: new Date() },
            status: "pending"
        });

        res.status(200).json(upcomingRides);
    } catch (error) {
        res.status(500).json({ message: "Error fetching scheduled rides", error });
    }
});

// Cancel a scheduled ride
router.put("/cancel/:bookingId", async (req, res) => {
    try {
        const { bookingId } = req.params;

        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: "cancelled" },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking cancelled successfully", booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling booking", error });
    }
});


// Request a Shared Ride
router.post("/pool", async (req, res) => {
    try {
        const { userId, pickupLocation, dropoffLocation } = req.body;

        // Check if a matching ride exists (same route within 5km radius)
        let existingRide = await Ride.findOne({
            dropoffLocation,
            status: "pending",
            "pooling.users": { $size: { $lt: 4 } } // Max 4 people per ride
        });

        if (existingRide) {
            // Add user to the existing ride
            existingRide.pooling.users.push(userId);
            existingRide.fare = existingRide.fare / existingRide.pooling.users.length;
            await existingRide.save();
            return res.status(200).json({ message: "Joined an existing ride", ride: existingRide });
        }

        // Create a new shared ride if no match is found
        const newRide = new Ride({
            userId,
            pickupLocation,
            dropoffLocation,
            pooling: { users: [userId] },
            fare: 100 // Default fare, later adjusted based on passengers
        });

        await newRide.save();
        res.status(201).json({ message: "Shared ride created", ride: newRide });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

module.exports = router;


module.exports = router;
