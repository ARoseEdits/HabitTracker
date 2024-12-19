const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Import API routes from api.js
const apiRoutes = require('./routes/apiRoutes');  // Ensure correct path

require('dotenv').config();  // Load environment variables

const app = express();
app.use(cors({
  origin: 'http://localhost:8081', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Use the API routes under '/api'
app.use('/api', apiRoutes);

// Serve product images statically from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directories if they don't exist
const uploadDir = path.join(__dirname, 'uploads');
const userUploadsDir = path.join(uploadDir, 'users');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
if (!fs.existsSync(userUploadsDir)) {
  fs.mkdirSync(userUploadsDir);
}

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT || 5000;

    // Ensure MongoDB URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined.');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    console.log('Connected to MongoDB');

    // Start server
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);  // Exit with failure
  }
};

start();
