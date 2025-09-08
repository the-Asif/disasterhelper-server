const express = require('express');
const router = express.Router();
const {
  getAllVolunteers,
  registerVolunteer,
  getVolunteer,
  updateVolunteer,
  deleteVolunteer,
  assignVolunteer
} = require('../controllers/volunteerController');

// CRUD Routes
router.route('/')
  .get(getAllVolunteers)
  .post(registerVolunteer);

router.route('/assign')
  .post(assignVolunteer);

router.route('/:id')
  .get(getVolunteer)
  .put(updateVolunteer)
  .delete(deleteVolunteer);

module.exports = router;