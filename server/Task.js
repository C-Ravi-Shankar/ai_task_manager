const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  userId: String   // ✅ add this
});

module.exports = mongoose.model("Task", TaskSchema);

module.exports = mongoose.model("Task", TaskSchema);