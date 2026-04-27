const Task = require("./Task");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

mongoose.connect("mongodb+srv://ravishankar:vibecoderravi@cluster0.55qprpy.mongodb.net/?appName=Cluster0")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.post("/tasks", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});