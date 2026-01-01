const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  type: {
    type: String,
    enum: ["RECEIVED", "SPENT"],
    required: true
  },
  amount: { type: Number, required: true },
  person: String,
  purpose: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
