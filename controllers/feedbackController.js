const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    const db = getDB();
    const feedback = await db.collection('feedback').find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const db = getDB();
    const { name, email, rating, message, category } = req.body;
    
    if (!name || !email || !rating || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = { 
      name,
      email,
      rating: parseInt(rating),
      message,
      category: category || 'general',
      createdAt: new Date(),
      status: 'new'
    };
    
    const result = await db.collection('feedback').insertOne(newFeedback);
    res.status(201).json({ _id: result.insertedId, ...newFeedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single feedback
exports.getFeedback = async (req, res) => {
  try {
    const db = getDB();
    const feedback = await db.collection('feedback').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.rating) {
      updateData.rating = parseInt(updateData.rating);
    }

    const result = await db.collection('feedback').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    const updatedFeedback = await db.collection('feedback').findOne({
      _id: new ObjectId(id)
    });

    res.status(200).json(updatedFeedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('feedback').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    
    res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};