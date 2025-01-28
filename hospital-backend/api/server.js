const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Import Routes
const authRoutes = require('../routes/auth');
const doctorRoutes = require('../routes/doctors');
const patientRoutes = require('../routes/patients');
const appointmentRoutes = require('../routes/appointments');
const specializationRoutes = require('../routes/specializations');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection options with timeout
const mongoOptions = {
   
    serverSelectionTimeoutMS: 30000,  // Timeout after 30 seconds
};

// Connect to MongoDB with logging
mongoose.connect(process.env.MONGO_URI, mongoOptions)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);  // Exit process if unable to connect to DB
    });

// MongoDB connection events
mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB connection disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Routes Middleware
app.use('/auth', authRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/specializations', specializationRoutes);

// Start the server and log the port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Add this route for the root
app.get('/', (req, res) => {
    res.send('Welcome to the Hospital Backend API!');
});
