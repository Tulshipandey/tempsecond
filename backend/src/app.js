const express  = require("express")
const app = express();


app.get("/", (req, res) => {
    res.send("Hello World");
});

 // Middleware
const errorMiddleware = require("./src/middlewares/error.middleware");
app.use(errorMiddleware);
const corsMiddleware = require("./src/middlewares/cors.middleware");
app.use(corsMiddleware);

// db connection
const db = require("./db/db");
db() ;

// express-rate-limit
const limiter = require("./src/middlewares/rateLimitMiddleware");
app.use(limiter);




module.exports = app;