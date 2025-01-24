// models/specialization.js
const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema({
    specializationName: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Specialization', SpecializationSchema);
