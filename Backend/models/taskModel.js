const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Urgent', 'Routine', 'Admin'],
      default: 'Routine',
    },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;