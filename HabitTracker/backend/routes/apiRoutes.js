const express = require('express');
const userRoutes = require('./userRoutes');
const router = express.Router();

// Test route for API health check
router.get('/test', (req, res) => {
  res.json({ message: 'API is working correctly!' });
});

// Register API routes
router.use('/users', userRoutes);        // Route for users

module.exports = router;
