// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');


// Register
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ username, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// routes/auth.js
router.get('/list', async (req, res) => {
    console.log('Request received to list users');
    try {
        console.time('User.find'); // Log query duration
        const users = await User.find(); // Use the `User` model to fetch users
        console.timeEnd('User.find');
        console.log('Users retrieved successfully');
        res.status(200).json(users); // Return `users` data
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// DELETE user
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE user
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CHANGE password
router.patch('/:id/password', verifyToken, async (req, res) => {
    const { password } = req.body;
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
