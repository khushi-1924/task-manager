import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Task", taskSchema);