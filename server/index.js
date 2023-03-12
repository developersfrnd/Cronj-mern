const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TaskModel = require("./models/Task");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://prashant:bSOBuyuiQl28cRCq@cluster0.lw6dqa8.mongodb.net/?retryWrites=true&w=majority');

app.get("/getTasks", (req, res) => {
  TaskModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/createTask", async (req, res) => {
  const task = req.body;
  const newTask = new TaskModel(task);
  await newTask.save();

  res.json(task);
});

app.delete("/deleteTask/:id", async (req, res) => {
  const taskId = req.params.id;
  TaskModel.deleteOne({ _id: taskId }, function (err) {
    if (err) return handleError(err);
     console.log(`error on delete task ${err}`);
  });
  
  res.status('200').send('Task deleted successfully.');
});

app.listen(3001, () => {
  console.log("Listining...");
});
