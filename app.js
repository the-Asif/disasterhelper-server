const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const helpRoutes = require('./routes/helpRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/help', helpRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Connect to DB
connectDB();

module.exports = app;