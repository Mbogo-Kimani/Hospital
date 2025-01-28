// Appointment Schema
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'] 
    },
    specialist: { type: String, required: true }, // Specialist the patient wants to see
    visitDate: { type: Date, required: true }, // Day of the visit
    visitTime: { type: String, required: true }, // Time of the visit (e.g., "10:00 AM")
    reason: { type: String, required: true }, // Reason for the appointment
    createdAt: { type: Date, default: Date.now } // Timestamp for when the appointment was created
});

module.exports = mongoose.model('Appointment', appointmentSchema);
