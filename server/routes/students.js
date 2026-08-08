const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  getStudentDashboard,
  deleteStudent,
  resetPassword
} = require('../controllers/studentController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(protect, admin, createStudent)
  .get(protect, admin, getStudents);

router.route('/:id')
  .get(getStudent)
  .put(protect, updateStudent)
  .delete(protect, admin, deleteStudent);

router.get('/:id/dashboard', protect, getStudentDashboard);
router.put('/:id/password', protect, admin, resetPassword);

module.exports = router;
