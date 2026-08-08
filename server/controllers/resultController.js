const Result = require('../models/Result');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Create a new result
// @route   POST /api/results
// @access  Private/Admin
exports.createResult = async (req, res) => {
  try {
    const {
      student,
      course,
      examType,
      examDate,
      subjects,
      totalMarksObtained,
      totalMarks,
      percentage,
      grade,
      status
    } = req.body;

    // Validate required fields
    if (!student || !course || !examType || !examDate || !totalMarksObtained || !totalMarks || !percentage || !grade || !status) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    const result = await Result.create({
      student,
      course,
      examType,
      examDate,
      subjects: subjects || [],
      totalMarksObtained,
      totalMarks,
      percentage,
      grade,
      status
    });

    res.status(201).json({
      success: true,
      message: 'Result created successfully',
      data: result
    });
  } catch (error) {
    console.error('Create result error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all results
// @route   GET /api/results
// @access  Private/Admin
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find()
      .populate('student', 'name email mobile')
      .populate('course', 'name code')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get result by student ID
// @route   GET /api/results/student/:studentId
// @access  Private
exports.getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.params.studentId })
      .populate('course', 'name code')
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Update result
// @route   PUT /api/results/:id
// @access  Private/Admin
exports.updateResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'Result not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Delete result
// @route   DELETE /api/results/:id
// @access  Private/Admin
exports.deleteResult = async (req, res) => {
  try {
    const result = await Result.findByIdAndDelete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ 
        success: false, 
        message: 'Result not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Result deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
