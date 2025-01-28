// models/patient.js
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    status: { type: String, enum: ['inpatient', 'outpatient'], required: true },
    dateVisited: { type: Date, required: true },
    admissionDetails: {
        isAdmitted: { type: Boolean, required: true }, // Update to use isAdmitted
        dateAdmitted: { type: Date },
        dateReleased: { type: Date },
    },
    diagnosis: { type: String, required: true },
});

module.exports = mongoose.model('Patient', PatientSchema);
