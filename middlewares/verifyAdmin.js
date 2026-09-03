// middlewares/verifyAdmin.js
const { getDB } = require('../config/db');

const verifyAdmin = async (req, res, next) => {
  const email = req.decoded?.email;

  if (!email) {
    return res.status(401).send({ message: 'unauthorized access' });
  }

  try {
    const db = getDB();
    const user = await db.collection('users').findOne({ email });

    if (!user || user.role !== 'admin') {
      return res.status(403).send({ message: 'forbidden access' });
    }

    next();
  } catch (err) {
    return res.status(500).send({ message: 'internal server error', error: err.message });
  }
};

module.exports = verifyAdmin;

