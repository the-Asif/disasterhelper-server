const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByEmail // Add this import
} = require('../controllers/userController');

// CRUD Routes
router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/email/:email') // Add this route
  .get(getUserByEmail);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;