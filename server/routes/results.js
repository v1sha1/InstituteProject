const express = require('express');
const router = express.Router();
const {
  createResult,
  getResults,
  getStudentResults,
  updateResult,
  deleteResult
} = require('../controllers/resultController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, admin, getResults)
  .post(protect, admin, createResult);

router.route('/student/:studentId')
  .get(protect, getStudentResults);

router.route('/:id')
  .put(protect, admin, updateResult)
  .delete(protect, admin, deleteResult);

module.exports = router;
