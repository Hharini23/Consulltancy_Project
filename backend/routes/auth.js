const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { email, phone, password } = req.body;

  if (!email || !phone || !password) {
    return res.status(400).json({ message: 'Please provide email, phone, and password.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Create new user
    const newUser = new User({ email, phone, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

module.exports = router;
