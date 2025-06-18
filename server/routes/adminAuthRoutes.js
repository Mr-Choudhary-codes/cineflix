const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser'); // Assuming AdminUser model is in ../models/AdminUser.js

const router = express.Router();

// POST /api/admin/login - Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // Check if admin user exists
    const admin = await AdminUser.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    // Replace 'YOUR_JWT_SECRET' with an actual secret, preferably from environment variables
    const token = jwt.sign(
      { userId: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'YOUR_JWT_SECRET', // It's better to use environment variables for secrets
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.json({ token, userId: admin._id, username: admin.username });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// Example of how you might add a new admin (for setup purposes, remove or secure this later)
// This should ideally be a separate script or a protected route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required for registration.' });
  }

  try {
    const existingAdmin = await AdminUser.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new AdminUser({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin user registered successfully. Please login.' });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});


module.exports = router;
