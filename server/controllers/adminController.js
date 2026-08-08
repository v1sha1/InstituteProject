const User = require('../models/User');
const Course = require('../models/Course');
const Admission = require('../models/Admission');
const Fee = require('../models/Fee');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalCourses = await Course.countDocuments({ isActive: true });
    const pendingAdmissions = await Admission.countDocuments({ status: 'pending' });
    const totalRevenue = await Fee.aggregate([
      { $group: { _id: null, total: { $sum: '$paidAmount' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        pendingAdmissions,
        totalRevenue: totalRevenue[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get recent admissions
// @route   GET /api/admin/recent-admissions
// @access  Private/Admin
exports.getRecentAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate('student')
      .populate('course')
      .sort('-createdAt')
      .limit(10);
    
    res.status(200).json({
      success: true,
      count: admissions.length,
      data: admissions
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get fee statistics
// @route   GET /api/admin/fee-stats
// @access  Private/Admin
exports.getFeeStats = async (req, res) => {
  try {
    const fees = await Fee.find();
    const totalPending = fees.reduce((acc, fee) => acc + fee.pendingAmount, 0);
    const totalPaid = fees.reduce((acc, fee) => acc + fee.paidAmount, 0);
    const totalCollected = fees.reduce((acc, fee) => acc + fee.totalFees, 0);

    res.status(200).json({
      success: true,
      data: {
        totalPending,
        totalPaid,
        totalCollected
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
