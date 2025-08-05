const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all volunteers
exports.getAllVolunteers = async (req, res) => {
  try {
    const db = getDB();
    const volunteers = await db.collection('volunteers').find().toArray();
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register new volunteer
exports.registerVolunteer = async (req, res) => {
  try {
    const db = getDB();
    const { name, address, email, contact } = req.body;
    
    if (!name || !address || !email || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if email already exists
    const existingVolunteer = await db.collection('volunteers').findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newVolunteer = { 
      name,
      address,
      email,
      contact,
      registeredAt: new Date(),
      status: 'active' // You can add more fields like skills, availability, etc.
    };
    
    const result = await db.collection('volunteers').insertOne(newVolunteer);
    res.status(201).json({ _id: result.insertedId, ...newVolunteer });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single volunteer
exports.getVolunteer = async (req, res) => {
  try {
    const db = getDB();
    const volunteer = await db.collection('volunteers').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    res.status(200).json(volunteer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update volunteer
exports.updateVolunteer = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = req.body;

    const result = await db.collection('volunteers').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    const updatedVolunteer = await db.collection('volunteers').findOne({
      _id: new ObjectId(id)
    });

    res.status(200).json(updatedVolunteer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete volunteer
exports.deleteVolunteer = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('volunteers').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    
    res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};