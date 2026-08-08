const express = require('express');
const router = express.Router();
const {
  getStats,
  getRecentAdmissions,
  getFeeStats
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/stats', protect, admin, getStats);
router.get('/recent-admissions', protect, admin, getRecentAdmissions);
router.get('/fee-stats', protect, admin, getFeeStats);

module.exports = router;
