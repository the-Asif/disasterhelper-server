const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const helpRoutes = require('./routes/helpRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const donationRoutes = require('./routes/donationRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const userRoutes = require('./routes/userRoutes');
const bulletinRoutes = require('./routes/bulletinRoutes');

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/bulletins', bulletinRoutes);

// Connect to DB
connectDB();

module.exports = app;