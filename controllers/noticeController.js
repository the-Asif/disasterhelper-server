const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all notices (sorted by priority and date)
exports.getAllNotices = async (req, res) => {
  try {
    const db = getDB();
    const notices = await db.collection('notices')
      .find()
      .sort({ 
        priority: -1, // High priority first
        createdAt: -1 // Newest first
      })
      .toArray();
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new notice
exports.createNotice = async (req, res) => {
  try {
    const db = getDB();
    const { title, content, priority } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const newNotice = { 
      title,
      content,
      priority: priority || 'normal',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('notices').insertOne(newNotice);
    res.status(201).json({ _id: result.insertedId, ...newNotice });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single notice
exports.getNotice = async (req, res) => {
  try {
    const db = getDB();
    const notice = await db.collection('notices').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!notice) {
      return res.status(404).json({ error: 'Notice not found' });
    }

    res.status(200).json(notice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update notice
exports.updateNotice = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = req.body;

    updateData.updatedAt = new Date();

    const result = await db.collection('notices').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Notice not found' });
    }

    const updatedNotice = await db.collection('notices').findOne({
      _id: new ObjectId(id)
    });

    res.status(200).json(updatedNotice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete notice
exports.deleteNotice = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('notices').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Notice not found' });
    }
    
    res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};