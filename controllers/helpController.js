const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all help requests
exports.getAllHelpRequests = async (req, res) => {
  try {
    const db = getDB();
    const helpRequests = await db.collection('helpRequests').find().toArray();
    res.status(200).json(helpRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new help request
exports.createHelpRequest = async (req, res) => {
  try {
    const db = getDB();
    const { type, number_of_affected_people, location, contact } = req.body;
    
    if (!type || !number_of_affected_people || !location || !contact) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newRequest = { 
      type,
      number_of_affected_people: parseInt(number_of_affected_people),
      location,
      contact,
      assignedVolunteers: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await db.collection('helpRequests').insertOne(newRequest);
    res.status(201).json({ _id: result.insertedId, ...newRequest });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single help request
exports.getHelpRequest = async (req, res) => {
  try {
    const db = getDB();
    const request = await db.collection('helpRequests').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Help request not found' });
    }

    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update help request
exports.updateHelpRequest = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.number_of_affected_people) {
      updateData.number_of_affected_people = parseInt(updateData.number_of_affected_people);
    }

    updateData.updatedAt = new Date();

    const result = await db.collection('helpRequests').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Help request not found' });
    }

    const updatedRequest = await db.collection('helpRequests').findOne({
      _id: new ObjectId(id)
    });

    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getHelpRequestsByLocation = async (req, res) => {
  try {
    const db = getDB();
    const { location } = req.params;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }

    // Case-insensitive search for location
    const helpRequests = await db.collection('helpRequests').find({
      location: { $regex: location, $options: 'i' } // 'i' for case-insensitive
    }).toArray();

    res.status(200).json(helpRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete help request
exports.deleteHelpRequest = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('helpRequests').deleteOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Help request not found' });
    }
    
    res.status(200).json({ _id: req.params.id, deleted: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};