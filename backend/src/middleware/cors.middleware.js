const cors = require("cors");

const corsMiddleware = cors({
  origin: "*", // Change this for security in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

module.exports = corsMiddleware;
