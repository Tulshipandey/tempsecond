const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const rideRoutes = require("./routes/rideRoutes");

dotenv.config();
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON request body

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rides", rideRoutes);

// Socket.IO
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("updateLocation", ({ rideId, location }) => {
        io.emit(`rideLocation:${rideId}`, location);  // Emit to all clients (for demo)
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
        console.log("🚀 Server running on port " + (process.env.PORT || 5000));
    });
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);  // Exit process on failure
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Global error handler (Optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
