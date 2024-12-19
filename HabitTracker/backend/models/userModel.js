const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  password: { type: String, required: true },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zip: { type: String, default: '' }
  },
  profilePicture: { type: String, default: '' },
  stripeCustomerId: { type: String, default: '' },
  role: { type: String, default: 'user' },
  status: { type: String, default: 'active' }
});

// Create the model from the schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;