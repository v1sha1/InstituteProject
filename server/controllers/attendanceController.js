const Attendance = require('../models/Attendance');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Mark attendance for a student
// @route   POST /api/attendance
// @access  Private/Admin/Teacher
exports.markAttendance = async (req, res) => {
  try {
    const { student, course, date, status, remarks } = req.body;

    // Check if attendance already exists for this student on this date
    const existingAttendance = await Attendance.findOne({ student, date });
    if (existingAttendance) {
      return res.status(400).json({
        success: false,
        message: 'Attendance already marked for this student on this date'
      });
    }

    const attendance = await Attendance.create({
      student,
      course,
      date,
      status,
      remarks
    });

    res.status(201).json({
      success: true,
      message: 'Attendance marked successfully',
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Bulk mark attendance for multiple students
// @route   POST /api/attendance/bulk
// @access  Private/Admin/Teacher
exports.bulkMarkAttendance = async (req, res) => {
  try {
    const { course, date, attendanceRecords } = req.body;

    if (!attendanceRecords || attendanceRecords.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No attendance records provided'
      });
    }

    const results = [];
    const errors = [];

    for (const record of attendanceRecords) {
      try {
        // Check if attendance already exists
        const existing = await Attendance.findOne({
          student: record.student,
          date
        });

        if (existing) {
          // Update existing record
          existing.status = record.status;
          existing.remarks = record.remarks;
          await existing.save();
          results.push({ student: record.student, status: 'updated' });
        } else {
          // Create new record
          await Attendance.create({
            student: record.student,
            course,
            date,
            status: record.status,
            remarks: record.remarks
          });
          results.push({ student: record.student, status: 'created' });
        }
      } catch (error) {
        errors.push({ student: record.student, error: error.message });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Bulk attendance processed',
      data: {
        processed: results.length,
        errors: errors.length,
        results,
        errors
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all attendance records
// @route   GET /api/attendance
// @access  Private/Admin/Teacher
exports.getAttendance = async (req, res) => {
  try {
    const { course, date, student } = req.query;
    let query = {};

    if (course) query.course = course;
    if (date) query.date = new Date(date);
    if (student) query.student = student;

    const attendance = await Attendance.find(query)
      .populate('student', 'name email mobile')
      .populate('course', 'name code')
      .sort('-date');

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get attendance by student ID
// @route   GET /api/attendance/student/:studentId
// @access  Private
exports.getStudentAttendance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { student: req.params.studentId };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query)
      .populate('course', 'name code')
      .sort('-date');

    // Calculate attendance statistics
    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const total = attendance.length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
      stats: {
        present,
        absent,
        late,
        total,
        percentage
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get attendance by course
// @route   GET /api/attendance/course/:courseId
// @access  Private/Admin/Teacher
exports.getCourseAttendance = async (req, res) => {
  try {
    const { date } = req.query;
    let query = { course: req.params.courseId };

    if (date) {
      query.date = new Date(date);
    }

    const attendance = await Attendance.find(query)
      .populate('student', 'name email mobile')
      .sort('student');

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get attendance by date
// @route   GET /api/attendance/date/:date
// @access  Private/Admin/Teacher
exports.getDateAttendance = async (req, res) => {
  try {
    const { course } = req.query;
    const date = new Date(req.params.date);
    let query = { date };

    if (course) {
      query.course = course;
    }

    const attendance = await Attendance.find(query)
      .populate('student', 'name email mobile')
      .populate('course', 'name code')
      .sort('student');

    res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update attendance record
// @route   PUT /api/attendance/:id
// @access  Private/Admin/Teacher
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: attendance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private/Admin
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get attendance statistics
// @route   GET /api/attendance/stats
// @access  Private/Admin/Teacher
exports.getAttendanceStats = async (req, res) => {
  try {
    const { course, startDate, endDate } = req.query;
    let query = {};

    if (course) query.course = course;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query);

    const present = attendance.filter(a => a.status === 'present').length;
    const absent = attendance.filter(a => a.status === 'absent').length;
    const late = attendance.filter(a => a.status === 'late').length;
    const total = attendance.length;
    const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;

    // Get unique students
    const uniqueStudents = await Attendance.distinct('student', query);

    res.status(200).json({
      success: true,
      data: {
        present,
        absent,
        late,
        total,
        percentage,
        uniqueStudents: uniqueStudents.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get monthly attendance report
// @route   GET /api/attendance/report/monthly
// @access  Private/Admin/Teacher
exports.getMonthlyReport = async (req, res) => {
  try {
    const { course, year, month } = req.query;
    const targetYear = parseInt(year) || new Date().getFullYear();
    const targetMonth = parseInt(month) || new Date().getMonth() + 1;

    const startDate = new Date(targetYear, targetMonth - 1, 1);
    const endDate = new Date(targetYear, targetMonth, 0);

    let query = {
      date: {
        $gte: startDate,
        $lte: endDate
      }
    };

    if (course) query.course = course;

    const attendance = await Attendance.find(query)
      .populate('student', 'name email')
      .populate('course', 'name code');

    // Group by student
    const studentStats = {};
    attendance.forEach(record => {
      const studentId = record.student._id.toString();
      if (!studentStats[studentId]) {
        studentStats[studentId] = {
          student: record.student,
          course: record.course,
          present: 0,
          absent: 0,
          late: 0,
          total: 0
        };
      }
      studentStats[studentId][record.status]++;
      studentStats[studentId].total++;
    });

    // Calculate percentages
    const report = Object.values(studentStats).map(stat => ({
      ...stat,
      percentage: stat.total > 0 ? ((stat.present / stat.total) * 100).toFixed(2) : 0
    }));

    res.status(200).json({
      success: true,
      data: {
        month: targetMonth,
        year: targetYear,
        report
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
