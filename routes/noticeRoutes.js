const express = require('express');
const router = express.Router();
const {
  getAllNotices,
  createNotice,
  getNotice,
  updateNotice,
  deleteNotice
} = require('../controllers/noticeController');

// CRUD Routes
router.route('/')
  .get(getAllNotices)
  .post(createNotice);

router.route('/:id')
  .get(getNotice)
  .put(updateNotice)
  .delete(deleteNotice);

module.exports = router;