// routes/specializations.js
const express = require('express');
const Specialization = require('../models/specialization');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

// Add Specialization
router.post('/add', async (req, res) => {
    const { specializationName } = req.body;
    try {
        const specialization = new Specialization({ specializationName });
        await specialization.save();
        res.status(201).json({ message: 'Specialization added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Specializations
router.get('/list',  async (req, res) => {
    try {
        const specializations = await Specialization.find();
        res.status(200).json(specializations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE 
router.delete('/specializationName',  async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE 
router.put('/specializationName', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
