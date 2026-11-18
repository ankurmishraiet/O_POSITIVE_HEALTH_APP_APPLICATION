const Task = require('../../models/taskModel');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task ka title likho' });
    }
    const task = await Task.create({ title, category });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task nahi mila' });
    }
    task.done = !task.done;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task nahi mila' });
    }
    res.json({ message: 'Task delete ho gaya' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getTasks, addTask, toggleTask, deleteTask };