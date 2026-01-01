const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Transaction = require("../models/Transaction");

// Home – list projects
router.get("/", async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.render("projects", { projects });
});

// Create project
router.post("/projects", async (req, res) => {
  await Project.create({ name: req.body.name });
  res.redirect("/");
});

// Project detail + summary
router.get("/projects/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.redirect("/");

  const transactions = await Transaction.find({ projectId: project._id });

  const totalReceived = transactions
    .filter(t => t.type === "RECEIVED")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter(t => t.type === "SPENT")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalReceived - totalSpent;

  res.render("project", {
    project,
    transactions,
    totalReceived,
    totalSpent,
    balance
  });
});

// ❌ DELETE PROJECT (AND ITS TRANSACTIONS)
router.post("/projects/:id/delete", async (req, res) => {
  const projectId = req.params.id;

  await Transaction.deleteMany({ projectId });
  await Project.findByIdAndDelete(projectId);

  res.redirect("/");
});

module.exports = router;
