const errorMiddleware = (err, req, res, next) => {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  };
  
  module.exports = errorMiddleware;
  