const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const verifyToken = require('../middleware/verifyToken');


// Add Doctor
router.post('/add', async (req, res) => {
    const { name, workingID, role, specialization } = req.body;
    try {
        const doctor = new Doctor({ name, workingID, role, specialization });
        await doctor.save();
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Doctors
router.get('/list', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a doctor by ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE doctor
router.put('/:id', verifyToken, async (req, res) => {
    console.log(`Request received to update doctor with ID: ${req.params.id}`);
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDoctor) return res.status(404).json({ message: "Doctor not found" });
        res.json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
