const express = require('express');
const router = express.Router();
const {
  getAllBulletins,
  getBulletin,
  createBulletin,
  updateBulletin,
  deleteBulletin
} = require('../controllers/bulletinController');

// CRUD Routes
router.route('/')
  .get(getAllBulletins)
  .post(createBulletin);

router.route('/:id')
  .get(getBulletin)
  .put(updateBulletin)
  .delete(deleteBulletin);

module.exports = router;