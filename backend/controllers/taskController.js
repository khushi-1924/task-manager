import Task from "../models/Task.js";

export const getTasks = async (req,res)=>{
  const tasks = await Task.find();
  res.json(tasks);
};

export const createTask = async (req,res)=>{
  const task = await Task.create(req.body);
  res.json(task);
};

export const deleteTask = async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({msg:"Deleted"});
};

export const toggleTask = async (req,res)=>{
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
};

export const updateTask = async (req, res) => {
  try {
    const { title } = req.body;

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};