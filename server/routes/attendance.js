const express = require('express');
const router = express.Router();
const {
  markAttendance,
  bulkMarkAttendance,
  getAttendance,
  getStudentAttendance,
  getCourseAttendance,
  getDateAttendance,
  updateAttendance,
  deleteAttendance,
  getAttendanceStats,
  getMonthlyReport
} = require('../controllers/attendanceController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, getAttendance)
  .post(protect, bulkMarkAttendance);

router.route('/stats')
  .get(protect, getAttendanceStats);

router.route('/report/monthly')
  .get(protect, getMonthlyReport);

router.route('/student/:studentId')
  .get(protect, getStudentAttendance);

router.route('/course/:courseId')
  .get(protect, getCourseAttendance);

router.route('/date/:date')
  .get(protect, getDateAttendance);

router.route('/:id')
  .put(protect, updateAttendance)
  .delete(protect, admin, deleteAttendance);

module.exports = router;
