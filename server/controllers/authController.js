const User = require('../models/User');
const Course = require('../models/Course');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, fatherName, email, mobile, dob, address, course, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { mobile }] });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this email or mobile number' 
      });
    }

    let courseId = null;
    if (course) {
      if (mongoose.isValidObjectId(course)) {
        courseId = course;
      } else {
        const foundCourse = await Course.findOne({ 
          $or: [
            { name: new RegExp('^' + course.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$', 'i') },
            { name: new RegExp(course.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }, 
            { code: new RegExp(course.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') }
          ] 
        });
        if (foundCourse) {
          courseId = foundCourse._id;
        }
      }
    }

    // Create user with pending status
    const user = await User.create({
      name,
      fatherName,
      email,
      mobile,
      dob,
      address,
      course: courseId,
      password: password || undefined,
      role: 'student',
      admissionStatus: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Registration request submitted successfully! Your application is pending admin approval.',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        admissionStatus: user.admissionStatus
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, mobile, password } = req.body;

    console.log('Login attempt:', { email, mobile, password: '***' });

    // Validate email or mobile
    if (!email && !mobile) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide email or mobile number' 
      });
    }

    // Check for user
    const user = await User.findOne({ $or: [{ email }, { mobile }] }).select('+password');
    
    console.log('User found:', user ? 'Yes' : 'No');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    console.log('User role:', user.role);

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        course: user.course,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('course');
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email, mobile } = req.body;

    const user = await User.findOne({ $or: [{ email }, { mobile }] });
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'No user found with this email or mobile' 
      });
    }

    // In production, send email with reset token
    // For now, return success message
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to your email/mobile'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
