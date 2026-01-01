const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Add transaction
router.post("/projects/:id/transactions", async (req, res) => {
  await Transaction.create({
    projectId: req.params.id,
    type: req.body.type,
    amount: req.body.amount,
    person: req.body.person,
    purpose: req.body.purpose
  });

  res.redirect(`/projects/${req.params.id}`);
});

// Edit transaction
router.post("/transactions/:id/edit", async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);

  await Transaction.findByIdAndUpdate(req.params.id, {
    type: req.body.type,
    amount: req.body.amount,
    person: req.body.person,
    purpose: req.body.purpose
  });

  res.redirect(`/projects/${transaction.projectId}`);
});

// Delete transaction
router.post("/transactions/:id/delete", async (req, res) => {
  const transaction = await Transaction.findById(req.params.id);
  await Transaction.findByIdAndDelete(req.params.id);

  res.redirect(`/projects/${transaction.projectId}`);
});

module.exports = router;
