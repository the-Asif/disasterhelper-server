const express = require('express');
const router = express.Router();
const {
  getAllFeedback,
  createFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback
} = require('../controllers/feedbackController');

// CRUD Routes
router.route('/')
  .get(getAllFeedback)
  .post(createFeedback);

router.route('/:id')
  .get(getFeedback)
  .put(updateFeedback)
  .delete(deleteFeedback);

module.exports = router;