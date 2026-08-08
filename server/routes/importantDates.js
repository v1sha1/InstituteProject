const express = require('express');
const router = express.Router();
const {
  getImportantDates,
  createImportantDate,
  updateImportantDate,
  deleteImportantDate
} = require('../controllers/importantDateController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getImportantDates)
  .post(protect, admin, createImportantDate);

router.route('/:id')
  .put(protect, admin, updateImportantDate)
  .delete(protect, admin, deleteImportantDate);

module.exports = router;
