const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const Transaction = require("../models/Transaction");

// Home – list projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
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
  let filter = { projectId: project._id };

if (req.query.month) {
  const [year, month] = req.query.month.split("-");
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  filter.date = { $gte: start, $lt: end };
}

const transactions = await Transaction.find(filter);


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

module.exports = router;
