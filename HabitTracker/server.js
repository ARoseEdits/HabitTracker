const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.mongo_ULI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

const HabitSchema = new mongoose.Schema({
  menu: Number,
  name: String,
  completed: { type: Boolean, default: false },
});

const Habit = mongoose.model('Habit', HabitSchema);

app.get('/api/habits', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

app.put('/api/habits/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const habit = await Habit.findByIdAndUpdate(id, { completed }, { new: true });
  res.json(habit);
});

app.listen(5000, () => console.log('Server running on port 5000'));
