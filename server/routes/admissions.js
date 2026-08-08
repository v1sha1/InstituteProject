const express = require('express');
const router = express.Router();
const {
  getAdmissions,
  createAdmission,
  updateAdmission,
  getPendingAdmissions,
  approveAdmission,
  rejectAdmission
} = require('../controllers/admissionController');
const { protect, admin } = require('../middleware/auth');

// Get pending admissions for admin approval
router.get('/pending', protect, admin, getPendingAdmissions);

// Approve admission
router.put('/:id/approve', protect, admin, approveAdmission);

// Reject admission
router.put('/:id/reject', protect, admin, rejectAdmission);

router.route('/')
  .get(protect, admin, getAdmissions)
  .post(createAdmission);

router.route('/:id')
  .put(protect, admin, updateAdmission);

module.exports = router;
