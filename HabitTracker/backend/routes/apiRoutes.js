const express = require('express');
const userRoutes = require('./userRoutes');
const habitRoutes = require('./habitRoutes');
const router = express.Router();

// Test route for API health check
router.get('/test', (req, res) => {
  res.json({ message: 'API is working correctly!' });
});

// Register API routes
router.use('/users', userRoutes);        // Route for users

// Register habit routes
router.use('/habit', habitRoutes);        // Route for habits
module.exports = router;
