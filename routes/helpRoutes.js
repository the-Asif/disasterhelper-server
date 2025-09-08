const express = require('express');
const router = express.Router();
const {
  getAllHelpRequests,
  createHelpRequest,
  getHelpRequest,
  updateHelpRequest,
  deleteHelpRequest,
  getHelpRequestsByLocation // Add this import
} = require('../controllers/helpController');

// CRUD Routes
router.route('/')
  .get(getAllHelpRequests)
  .post(createHelpRequest);

router.route('/location/:location') // Add this route
  .get(getHelpRequestsByLocation);

router.route('/:id')
  .get(getHelpRequest)
  .put(updateHelpRequest)
  .delete(deleteHelpRequest);

module.exports = router;