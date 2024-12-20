
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();

// MongoDB Schema and Model
const HabitSchema = new mongoose.Schema({
  menu: Number,
  name: String,
  completed: { type: Boolean, default: false },
  parent: { type: String },
  habit: { type: String },
});

const Habit = mongoose.model('Habit', HabitSchema);

// Routes

// Get all habits
router.get('/', async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve habits.', error });
  }
});

// Update habit completion status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const habit = await Habit.findByIdAndUpdate(id, { completed }, { new: true });
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found.' });
    }
    res.json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update habit.', error });
  }
});

// Save a new habit
router.post('/', async (req, res) => {
  const { parent, habit } = req.body;

  if (!parent || !habit) {
    return res.status(400).json({ message: 'Parent and habit are required.' });
  }

  try {
    const newHabit = new Habit({ parent, habit });
    await newHabit.save();
    res.status(201).json({ message: 'Habit saved successfully.', newHabit });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save habit.', error });
  }
});

module.exports = router;
