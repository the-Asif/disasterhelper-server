const express = require('express');
const router = express.Router();
const {
  getAllVolunteers,
  registerVolunteer,
  getVolunteer,
  updateVolunteer,
  deleteVolunteer
} = require('../controllers/volunteerController');

// CRUD Routes
router.route('/')
  .get(getAllVolunteers)
  .post(registerVolunteer);

router.route('/:id')
  .get(getVolunteer)
  .put(updateVolunteer)
  .delete(deleteVolunteer);

module.exports = router;