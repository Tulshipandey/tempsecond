const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
router.get("/protected-route", authMiddleware, (req, res) => res.json({ user: req.user }));
module.exports = router;