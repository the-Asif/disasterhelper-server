const express = require('express');
const router = express.Router();
const {
  getAllDonations,
  createDonation,
  getDonation,
  getTotalDonations,
  getRecentDonations
} = require('../controllers/donationController');

// CRUD Routes
router.route('/')
  .get(getAllDonations)
  .post(createDonation);

router.route('/total')
  .get(getTotalDonations);

router.route('/recent')
  .get(getRecentDonations);

router.route('/:id')
  .get(getDonation);

module.exports = router;