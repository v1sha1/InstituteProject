const express = require('express');
const router = express.Router();
const {
  createTeacher,
  getTeachers,
  getTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherDashboard,
  assignCourse,
  getTeacherStats
} = require('../controllers/teacherController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, admin, getTeachers)
  .post(protect, admin, createTeacher);

router.route('/stats')
  .get(protect, admin, getTeacherStats);

router.route('/:id')
  .get(protect, getTeacher)
  .put(protect, admin, updateTeacher)
  .delete(protect, admin, deleteTeacher);

router.route('/:id/dashboard')
  .get(protect, getTeacherDashboard);

router.route('/:id/assign-course')
  .put(protect, admin, assignCourse);

module.exports = router;
