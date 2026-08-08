const express = require('express');
const router = express.Router();
const {
  getDashboardAnalytics,
  getCourseAnalytics,
  getStudentPerformance,
  getMonthlyRevenue,
  getAttendanceTrends,
  exportAnalytics
} = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/auth');

router.get('/dashboard', protect, admin, getDashboardAnalytics);
router.get('/courses', protect, admin, getCourseAnalytics);
router.get('/students/performance', protect, admin, getStudentPerformance);
router.get('/revenue/monthly', protect, admin, getMonthlyRevenue);
router.get('/attendance/trends', protect, admin, getAttendanceTrends);
router.get('/export', protect, admin, exportAnalytics);

module.exports = router;
