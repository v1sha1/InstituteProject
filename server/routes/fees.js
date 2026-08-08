const express = require('express');
const router = express.Router();
const {
  createFee,
  getFees,
  getFee,
  getStudentFee,
  updateFee,
  deleteFee,
  processPayment,
  addInstallment,
  getFeeStats,
  getOverdueFees
} = require('../controllers/feeController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, admin, getFees)
  .post(protect, admin, createFee);

router.route('/stats')
  .get(protect, admin, getFeeStats);

router.route('/overdue')
  .get(protect, admin, getOverdueFees);

router.route('/student/:studentId')
  .get(protect, getStudentFee);

router.route('/:id')
  .get(protect, getFee)
  .put(protect, admin, updateFee)
  .delete(protect, admin, deleteFee);

router.route('/:id/payment')
  .post(protect, admin, processPayment);

router.route('/:id/installments')
  .post(protect, admin, addInstallment);

module.exports = router;
