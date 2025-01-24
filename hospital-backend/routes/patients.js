// routes/patients.js
const express = require('express');
const Patient = require('../models/patient');
const router = express.Router();

// Add Patient
router.post('/add', async (req, res) => {
    const { name, status, dateVisited, admissionDetails, diagnosis } = req.body;
    try {
        const patient = new Patient({ name, age, status, dateVisited, admissionDetails, diagnosis });
        await patient.save();
        res.status(201).json({ message: 'Patient added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Patients
router.get('/list', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE patient
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE patient
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPatient) return res.status(404).json({ message: "Patient not found" });
        res.json(updatedPatient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
