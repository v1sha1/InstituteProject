const Admission = require('../models/Admission');
const User = require('../models/User');

// @desc    Get all pending admissions
// @route   GET /api/admissions/pending
// @access  Private/Admin
exports.getPendingAdmissions = async (req, res) => {
  try {
    const admissions = await User.find({ admissionStatus: 'pending', role: 'student' })
      .populate('course')
      .sort('-createdAt');
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

// @desc    Approve admission
// @route   PUT /api/admissions/:id/approve
// @access  Private/Admin
exports.approveAdmission = async (req, res) => {
  try {
    const { password } = req.body;
    const student = await User.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }
    
    student.admissionStatus = 'approved';
    student.approvedBy = req.user._id;
    student.approvedDate = Date.now();

    if (password && password.trim().length >= 6) {
      student.password = password;
    }

    await student.save();
    
    res.status(200).json({
      success: true,
      data: student,
      message: 'Admission approved successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Reject admission
// @route   PUT /api/admissions/:id/reject
// @access  Private/Admin
exports.rejectAdmission = async (req, res) => {
  try {
    const student = await User.findByIdAndUpdate(
      req.params.id,
      { admissionStatus: 'rejected' },
      { new: true }
    );
    
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: student,
      message: 'Admission rejected'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private/Admin
exports.getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate('student')
      .populate('course')
      .sort('-createdAt');
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

// @desc    Create new admission
// @route   POST /api/admissions
// @access  Public
exports.createAdmission = async (req, res) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json({
      success: true,
      data: admission
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Update admission
// @route   PUT /api/admissions/:id
// @access  Private/Admin
exports.updateAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!admission) {
      return res.status(404).json({ 
        success: false, 
        message: 'Admission not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: admission
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
