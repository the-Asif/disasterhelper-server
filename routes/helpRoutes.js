const express = require('express');
const router = express.Router();
const {
  getAllHelpRequests,
  createHelpRequest,
  getHelpRequest,
  updateHelpRequest,
  deleteHelpRequest
} = require('../controllers/helpController');

// CRUD Routes
router.route('/')
  .get(getAllHelpRequests)
  .post(createHelpRequest);

router.route('/:id')
  .get(getHelpRequest)
  .put(updateHelpRequest)
  .delete(deleteHelpRequest);

module.exports = router;