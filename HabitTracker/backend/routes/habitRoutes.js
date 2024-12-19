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

// backend for habit editing page 
// Backend (Node.js - Express)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Model
const habitSchema = new mongoose.Schema({
  parent: { type: String, required: true },
  habit: { type: String, required: true },
});

const Habit = mongoose.model('Habit', habitSchema);

// Route to save habit ****
app.post('/habits', async (req, res) => {
  const { parent, habit } = req.body;

  if (!parent || !habit) {
    return res.status(400).json({ message: 'Parent and habit are required.' });
  }

  try {
    const newHabit = new Habit({ parent, habit });
    await newHabit.save();
    res.status(201).json({ message: 'Habit saved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save habit.', error });
  }
});

// route to log in 
app.post('/login', async (req, res) => {

  
// Start the server
const PORT = process.env.PORT || 3000;

mongoose
  .connect('<your-mongodb-connection-string>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
