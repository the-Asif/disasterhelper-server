const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const db = getDB();
    const donations = await db.collection('donations').find().sort({ createdAt: -1 }).toArray();
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new donation
exports.createDonation = async (req, res) => {
  try {
    const db = getDB();
    const { name, email, amount, paymentMethod, message, anonymous } = req.body;
    
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid donation amount is required' });
    }

    if (!anonymous && (!name || !email)) {
      return res.status(400).json({ error: 'Name and email are required for non-anonymous donations' });
    }

    const newDonation = { 
      name: anonymous ? '' : name,
      email: anonymous ? '' : email,
      amount: parseFloat(amount),
      paymentMethod,
      message: message || '',
      anonymous: Boolean(anonymous),
      createdAt: new Date(),
      status: 'completed'
    };
    
    const result = await db.collection('donations').insertOne(newDonation);
    res.status(201).json({ _id: result.insertedId, ...newDonation });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get single donation
exports.getDonation = async (req, res) => {
  try {
    const db = getDB();
    const donation = await db.collection('donations').findOne({
      _id: new ObjectId(req.params.id)
    });
    
    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.status(200).json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get total donations amount
exports.getTotalDonations = async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection('donations').aggregate([
      {
        $match: { status: 'completed' }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ]).toArray();

    const total = result.length > 0 ? result[0].total : 0;
    res.status(200).json({ total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get recent donations
exports.getRecentDonations = async (req, res) => {
  try {
    const db = getDB();
    const donations = await db.collection('donations')
      .find({ status: 'completed' })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    
    res.status(200).json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};