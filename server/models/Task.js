const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  }
});

const TaskModel = mongoose.model("tasks", TaskSchema);
module.exports = TaskModel;
