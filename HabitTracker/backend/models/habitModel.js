const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
  menu: { type: Number, required: true }, // Identifies the collapsible menu (1-7)
  name: { type: String, required: true }, // Name of the habit
  completed: { type: Boolean, default: false }, // Completion status of the habit
  parent: { type: String, required: true }, // Parent category or grouping
});

const Habit = mongoose.model('Habit', HabitSchema);

module.exports = Habit;
