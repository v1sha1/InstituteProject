const User = require('../models/User');
const Course = require('../models/Course');
const Attendance = require('../models/Attendance');

// @desc    Create a new teacher
// @route   POST /api/teachers
// @access  Private/Admin
exports.createTeacher = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      qualification,
      experience,
      specialization,
      subjects,
      salary,
      joiningDate,
      address,
      dob
    } = req.body;

    // Check if teacher already exists
    const existingTeacher = await User.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'Teacher with this email already exists'
      });
    }

    const teacher = await User.create({
      name,
      email,
      mobile,
      password,
      role: 'teacher',
      qualification,
      experience,
      specialization,
      subjects: subjects ? subjects.split(',').map(s => s.trim()) : [],
      salary,
      joiningDate: joiningDate || Date.now(),
      address,
      dob,
      isActive: true
    });

    res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      data: teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Private/Admin
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
      .select('-password')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single teacher
// @route   GET /api/teachers/:id
// @access  Private
exports.getTeacher = async (req, res) => {
  try {
    const teacher = await User.findOne({ _id: req.params.id, role: 'teacher' })
      .select('-password')
      .populate('course', 'name code');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update teacher
// @route   PUT /api/teachers/:id
// @access  Private/Admin
exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'teacher' },
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      data: teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete teacher
// @route   DELETE /api/teachers/:id
// @access  Private/Admin
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await User.findOneAndDelete({ _id: req.params.id, role: 'teacher' });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Teacher deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get teacher dashboard data
// @route   GET /api/teachers/:id/dashboard
// @access  Private/Teacher
exports.getTeacherDashboard = async (req, res) => {
  try {
    const teacher = await User.findOne({ _id: req.params.id, role: 'teacher' })
      .select('-password')
      .populate('course', 'name code');

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    // Get students assigned to teacher's courses
    const students = await User.find({ 
      role: 'student',
      course: { $in: teacher.course || [] }
    }).select('-password');

    // Get recent attendance marked by teacher
    const recentAttendance = await Attendance.find()
      .populate('student', 'name')
      .populate('course', 'name')
      .sort('-date')
      .limit(10);

    res.status(200).json({
      success: true,
      data: {
        teacher,
        students: {
          total: students.length,
          list: students
        },
        recentAttendance
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Assign course to teacher
// @route   PUT /api/teachers/:id/assign-course
// @access  Private/Admin
exports.assignCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const teacher = await User.findOne({ _id: req.params.id, role: 'teacher' });

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    teacher.course = courseId;
    await teacher.save();

    res.status(200).json({
      success: true,
      message: 'Course assigned successfully',
      data: teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get teacher statistics
// @route   GET /api/teachers/stats
// @access  Private/Admin
exports.getTeacherStats = async (req, res) => {
  try {
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const activeTeachers = await User.countDocuments({ role: 'teacher', isActive: true });

    // Calculate total salary
    const teachers = await User.find({ role: 'teacher' });
    const totalSalary = teachers.reduce((acc, teacher) => acc + (teacher.salary || 0), 0);

    // Average experience
    const totalExperience = teachers.reduce((acc, teacher) => acc + (teacher.experience || 0), 0);
    const avgExperience = totalTeachers > 0 ? (totalExperience / totalTeachers).toFixed(1) : 0;

    res.status(200).json({
      success: true,
      data: {
        totalTeachers,
        activeTeachers,
        inactiveTeachers: totalTeachers - activeTeachers,
        totalSalary,
        avgExperience
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
