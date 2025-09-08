const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all bulletins
exports.getAllBulletins = async (req, res) => {
  try {
    const db = getDB();
    const bulletins = await db.collection('bulletins')
      .find()
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(bulletins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single bulletin
exports.getBulletin = async (req, res) => {
  try {
    const db = getDB();
    const bulletin = await db.collection('bulletins').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!bulletin) {
      return res.status(404).json({ error: 'Bulletin not found' });
    }

    res.status(200).json(bulletin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new bulletin
exports.createBulletin = async (req, res) => {
  try {
    const db = getDB();
    const { title, content, priority = 'normal' } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const bulletinData = {
      title,
      content,
      priority,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'published'
    };

    const result = await db.collection('bulletins').insertOne(bulletinData);
    res.status(201).json({
      _id: result.insertedId,
      ...bulletinData,
      message: 'Bulletin created successfully'
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update bulletin
exports.updateBulletin = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date()
    };

    const result = await db.collection('bulletins').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Bulletin not found' });
    }

    const updatedBulletin = await db.collection('bulletins').findOne({
      _id: new ObjectId(id)
    });

    res.status(200).json(updatedBulletin);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete bulletin
exports.deleteBulletin = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('bulletins').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Bulletin not found' });
    }
    
    res.status(200).json({ 
      _id: req.params.id, 
      deleted: true,
      message: 'Bulletin deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};