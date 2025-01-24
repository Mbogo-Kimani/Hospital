// models/doctor.js
const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workingID: { type: String, required: true, unique: true },
    role: { type: String, enum: ['doctor', 'nurse'], required: true },
    specialization: { type: String, required: true },
    dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
