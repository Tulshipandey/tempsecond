const express  = require("express")
const app = express();
const mongoose = require("mongoose");
const config = require("./src/config/config");


app.get("/", (req, res) => {
    res.send("Hello World");
});

 // Middleware
const errorMiddleware = require("./src/middlewares/error.middleware");
app.use(errorMiddleware);
const corsMiddleware = require("./src/middlewares/cors.middleware");
app.use(corsMiddleware);


// Import Models
require("./src/models/User");
require("./src/models/MetroStation");
require("./src/models/ParkingSpot");
require("./src/models/Booking");
require("./src/models/LastMileRide");
require("./src/models/Transaction");

// db connection
mongoose.connect(config.MONGODB_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));



// express-rate-limit
const limiter = require("./src/middlewares/rateLimitMiddleware");
app.use(limiter);




module.exports = app;