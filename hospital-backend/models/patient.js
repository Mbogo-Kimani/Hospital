// models/patient.js
const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    status: { type: String, enum: ['inpatient', 'outpatient'], required: true },
    dateVisited: { type: Date, required: true },
    admissionDetails: {
        dateAdmitted: { type: Date },
        dateReleased: { type: Date },
    },
    diagnosis: { type: String, required: true },
});

module.exports = mongoose.model('Patient', PatientSchema);
