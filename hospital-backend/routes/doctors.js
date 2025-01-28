const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const verifyToken = require('../middleware/verifyToken');

// Add Doctor
router.post('/add', async (req, res) => {
    console.log('Request received to add a doctor');
    const { name, workingID, role, specialization } = req.body;

    try {
        const doctor = new Doctor({ name, workingID, role, specialization });
        await doctor.save();
        console.log('Doctor added successfully');
        res.status(201).json({ message: 'Doctor added successfully' });
    } catch (error) {
        console.error('Error adding doctor:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Get Doctors
router.get('/list', async (req, res) => {
    console.log('Request received to list doctors');
    try {
        console.time('Doctor.find'); // Log query duration
        const doctors = await Doctor.find();
        console.timeEnd('Doctor.find');
        console.log('Doctors retrieved successfully');
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// DELETE a doctor by ID
router.delete('/workingID', verifyToken, async (req, res) => {
    console.log(`Request received to delete doctor with ID: ${req.params.id}`);
    try {
        console.time('Doctor.findByIdAndDelete');
        const doctor = await Doctor.findByIdAndDelete(req.params.id);
        console.timeEnd('Doctor.findByIdAndDelete');

        if (!doctor) {
            console.log('Doctor not found');
            return res.status(404).json({ message: 'Doctor not found' });
        }

        console.log('Doctor deleted successfully');
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error deleting doctor:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE doctor
router.put('/workingID', verifyToken, async (req, res) => {
    console.log(`Request received to update doctor with ID: ${req.params.id}`);
    console.log('Request body:', req.body);

    try {
        console.time('Doctor.findByIdAndUpdate');
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.timeEnd('Doctor.findByIdAndUpdate');

        if (!updatedDoctor) {
            console.log('Doctor not found');
            return res.status(404).json({ message: 'Doctor not found' });
        }

        console.log('Doctor updated successfully');
        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error('Error updating doctor:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
