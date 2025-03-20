const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["credit_card", "debit_card", "upi", "wallet"], required: true },
  status: { type: String, enum: ["successful", "failed", "refunded"], required: true },
  transactionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);
