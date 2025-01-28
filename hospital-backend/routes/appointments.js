const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');
const verifyToken = require('../middleware/verifyToken');

// Create Appointment
router.post('/add', async (req, res) => {
    const { firstName, lastName, age, phoneNumber, email, specialist, visitDate, visitTime, reason } = req.body;
    try {
        const appointment = new Appointment({ firstName, lastName, age, phoneNumber, email, specialist, visitDate, visitTime, reason });
        await appointment.save();
        res.status(201).json({ message: 'Appointment added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get All Appointments
router.get('/list', verifyToken, async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Appointment by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Appointment
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Appointment
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
