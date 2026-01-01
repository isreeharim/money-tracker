require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const projectRoutes = require("./routes/projectRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

/* IMPORTANT: static FIRST */
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.use("/", projectRoutes);
app.use("/", transactionRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
