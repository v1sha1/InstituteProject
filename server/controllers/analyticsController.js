const User = require('../models/User');
const Course = require('../models/Course');
const Fee = require('../models/Fee');
const Attendance = require('../models/Attendance');
const Result = require('../models/Result');
const Admission = require('../models/Admission');

// @desc    Get comprehensive dashboard analytics
// @route   GET /api/analytics/dashboard
// @access  Private/Admin
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let dateFilter = {};
    
    if (startDate && endDate) {
      dateFilter = {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      };
    }

    // Student analytics
    const totalStudents = await User.countDocuments({ role: 'student' });
    const activeStudents = await User.countDocuments({ role: 'student', isActive: true });
    const newStudents = await User.countDocuments({ 
      role: 'student', 
      ...dateFilter 
    });

    // Course analytics
    const totalCourses = await Course.countDocuments({ isActive: true });
    const courses = await Course.find({ isActive: true });
    
    // Fee analytics
    const fees = await Fee.find();
    const totalFeesCollected = fees.reduce((acc, fee) => acc + (fee.paidAmount || 0), 0);
    const totalPendingFees = fees.reduce((acc, fee) => acc + (fee.pendingAmount || 0), 0);
    const totalRevenue = fees.reduce((acc, fee) => acc + (fee.totalFees || 0), 0);

    // Attendance analytics
    const attendance = await Attendance.find();
    const presentCount = attendance.filter(a => a.status === 'present').length;
    const absentCount = attendance.filter(a => a.status === 'absent').length;
    const attendanceRate = attendance.length > 0 
      ? ((presentCount / attendance.length) * 100).toFixed(2) 
      : 0;

    // Result analytics
    const results = await Result.find();
    const passCount = results.filter(r => r.status === 'pass').length;
    const failCount = results.filter(r => r.status === 'fail').length;
    const passRate = results.length > 0 
      ? ((passCount / results.length) * 100).toFixed(2) 
      : 0;

    // Admission analytics
    const pendingAdmissions = await User.countDocuments({ 
      role: 'student', 
      admissionStatus: 'pending' 
    });
    const approvedAdmissions = await User.countDocuments({ 
      role: 'student', 
      admissionStatus: 'approved' 
    });

    res.status(200).json({
      success: true,
      data: {
        students: {
          total: totalStudents,
          active: activeStudents,
          inactive: totalStudents - activeStudents,
          new: newStudents
        },
        courses: {
          total: totalCourses,
          list: courses.map(c => ({
            name: c.name,
            code: c.code,
            fees: c.fees,
            enrolled: User.countDocuments({ course: c._id })
          }))
        },
        fees: {
          collected: totalFeesCollected,
          pending: totalPendingFees,
          total: totalRevenue,
          collectionRate: totalRevenue > 0 
            ? ((totalFeesCollected / totalRevenue) * 100).toFixed(2) 
            : 0
        },
        attendance: {
          present: presentCount,
          absent: absentCount,
          total: attendance.length,
          rate: parseFloat(attendanceRate)
        },
        results: {
          pass: passCount,
          fail: failCount,
          total: results.length,
          passRate: parseFloat(passRate)
        },
        admissions: {
          pending: pendingAdmissions,
          approved: approvedAdmissions,
          total: pendingAdmissions + approvedAdmissions
        }
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get course-wise analytics
// @route   GET /api/analytics/courses
// @access  Private/Admin
exports.getCourseAnalytics = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });
    
    const courseAnalytics = await Promise.all(courses.map(async (course) => {
      const enrolledStudents = await User.countDocuments({ 
        role: 'student', 
        course: course._id 
      });
      
      const courseFees = await Fee.find({ course: course._id });
      const totalCollected = courseFees.reduce((acc, fee) => acc + fee.paidAmount, 0);
      const totalPending = courseFees.reduce((acc, fee) => acc + fee.pendingAmount, 0);
      
      const courseAttendance = await Attendance.find({ course: course._id });
      const presentCount = courseAttendance.filter(a => a.status === 'present').length;
      const attendanceRate = courseAttendance.length > 0 
        ? ((presentCount / courseAttendance.length) * 100).toFixed(2) 
        : 0;
      
      const courseResults = await Result.find({ course: course._id });
      const passCount = courseResults.filter(r => r.status === 'pass').length;
      const passRate = courseResults.length > 0 
        ? ((passCount / courseResults.length) * 100).toFixed(2) 
        : 0;

      return {
        courseId: course._id,
        courseName: course.name,
        courseCode: course.code,
        duration: course.duration,
        fees: course.fees,
        enrolledStudents,
        feesCollected: totalCollected,
        feesPending: totalPending,
        attendanceRate: parseFloat(attendanceRate),
        passRate: parseFloat(passRate)
      };
    }));

    res.status(200).json({
      success: true,
      count: courseAnalytics.length,
      data: courseAnalytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get student performance analytics
// @route   GET /api/analytics/students/performance
// @access  Private/Admin
exports.getStudentPerformance = async (req, res) => {
  try {
    const { courseId } = req.query;
    let filter = { role: 'student' };
    
    if (courseId) {
      filter.course = courseId;
    }

    const students = await User.find(filter)
      .populate('course', 'name code');

    const performanceData = await Promise.all(students.map(async (student) => {
      const attendance = await Attendance.find({ student: student._id });
      const presentCount = attendance.filter(a => a.status === 'present').length;
      const attendanceRate = attendance.length > 0 
        ? ((presentCount / attendance.length) * 100).toFixed(2) 
        : 0;

      const results = await Result.find({ student: student._id });
      const passCount = results.filter(r => r.status === 'pass').length;
      const avgPercentage = results.length > 0 
        ? (results.reduce((acc, r) => acc + r.percentage, 0) / results.length).toFixed(2) 
        : 0;

      const fee = await Fee.findOne({ student: student._id });
      const feeStatus = fee ? fee.status : 'N/A';

      return {
        studentId: student._id,
        name: student.name,
        email: student.email,
        course: student.course?.name || 'N/A',
        attendanceRate: parseFloat(attendanceRate),
        totalResults: results.length,
        passedResults: passCount,
        averagePercentage: parseFloat(avgPercentage),
        feeStatus
      };
    }));

    // Sort by average percentage
    performanceData.sort((a, b) => b.averagePercentage - a.averagePercentage);

    res.status(200).json({
      success: true,
      count: performanceData.length,
      data: performanceData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get monthly revenue analytics
// @route   GET /api/analytics/revenue/monthly
// @access  Private/Admin
exports.getMonthlyRevenue = async (req, res) => {
  try {
    const { year } = req.query;
    const targetYear = parseInt(year) || new Date().getFullYear();

    const monthlyData = [];
    
    for (let month = 1; month <= 12; month++) {
      const startDate = new Date(targetYear, month - 1, 1);
      const endDate = new Date(targetYear, month, 0);

      const fees = await Fee.find({
        lastPaymentDate: {
          $gte: startDate,
          $lte: endDate
        }
      });

      const monthlyRevenue = fees.reduce((acc, fee) => {
        const paymentsInMonth = fee.installments.filter(inst => 
          inst.paidDate && 
          new Date(inst.paidDate) >= startDate && 
          new Date(inst.paidDate) <= endDate
        );
        return acc + paymentsInMonth.reduce((sum, inst) => sum + inst.amount, 0);
      }, 0);

      monthlyData.push({
        month: month,
        monthName: new Date(targetYear, month - 1).toLocaleString('default', { month: 'long' }),
        revenue: monthlyRevenue,
        payments: fees.length
      });
    }

    res.status(200).json({
      success: true,
      year: targetYear,
      data: monthlyData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get attendance trends
// @route   GET /api/analytics/attendance/trends
// @access  Private/Admin
exports.getAttendanceTrends = async (req, res) => {
  try {
    const { courseId, days = 30 } = req.query;
    const daysCount = parseInt(days);
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysCount);

    let filter = {
      date: {
        $gte: startDate,
        $lte: endDate
      }
    };

    if (courseId) {
      filter.course = courseId;
    }

    const attendance = await Attendance.find(filter)
      .populate('course', 'name');

    // Group by date
    const trends = {};
    attendance.forEach(record => {
      const dateStr = record.date.toISOString().split('T')[0];
      if (!trends[dateStr]) {
        trends[dateStr] = {
          date: dateStr,
          present: 0,
          absent: 0,
          late: 0,
          total: 0
        };
      }
      trends[dateStr][record.status]++;
      trends[dateStr].total++;
    });

    const trendData = Object.values(trends).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    res.status(200).json({
      success: true,
      period: `${daysCount} days`,
      data: trendData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Export analytics report
// @route   GET /api/analytics/export
// @access  Private/Admin
exports.exportAnalytics = async (req, res) => {
  try {
    const { type } = req.query; // 'students', 'fees', 'attendance', 'results'

    let data = [];
    let filename = '';
    let headers = [];

    switch (type) {
      case 'students':
        const students = await User.find({ role: 'student' })
          .populate('course', 'name code');
        data = students.map(s => ({
          Name: s.name,
          Email: s.email,
          Mobile: s.mobile,
          Course: s.course?.name || 'N/A',
          Status: s.isActive ? 'Active' : 'Inactive',
          AdmissionStatus: s.admissionStatus
        }));
        filename = 'students-report.json';
        headers = ['Name', 'Email', 'Mobile', 'Course', 'Status', 'AdmissionStatus'];
        break;

      case 'fees':
        const fees = await Fee.find()
          .populate('student', 'name email')
          .populate('course', 'name');
        data = fees.map(f => ({
          Student: f.student?.name || 'N/A',
          Course: f.course?.name || 'N/A',
          TotalFees: f.totalFees,
          PaidAmount: f.paidAmount,
          PendingAmount: f.pendingAmount,
          Status: f.status
        }));
        filename = 'fees-report.json';
        headers = ['Student', 'Course', 'TotalFees', 'PaidAmount', 'PendingAmount', 'Status'];
        break;

      case 'attendance':
        const attendance = await Attendance.find()
          .populate('student', 'name')
          .populate('course', 'name');
        data = attendance.map(a => ({
          Student: a.student?.name || 'N/A',
          Course: a.course?.name || 'N/A',
          Date: a.date.toISOString().split('T')[0],
          Status: a.status,
          Remarks: a.remarks || 'N/A'
        }));
        filename = 'attendance-report.json';
        headers = ['Student', 'Course', 'Date', 'Status', 'Remarks'];
        break;

      case 'results':
        const results = await Result.find()
          .populate('student', 'name')
          .populate('course', 'name');
        data = results.map(r => ({
          Student: r.student?.name || 'N/A',
          Course: r.course?.name || 'N/A',
          ExamType: r.examType,
          ExamDate: r.examDate.toISOString().split('T')[0],
          TotalMarks: r.totalMarks,
          ObtainedMarks: r.totalMarksObtained,
          Percentage: r.percentage,
          Grade: r.grade,
          Status: r.status
        }));
        filename = 'results-report.json';
        headers = ['Student', 'Course', 'ExamType', 'ExamDate', 'TotalMarks', 'ObtainedMarks', 'Percentage', 'Grade', 'Status'];
        break;

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid export type. Use: students, fees, attendance, or results'
        });
    }

    res.status(200).json({
      success: true,
      message: 'Report generated successfully',
      data: {
        filename,
        headers,
        records: data.length,
        data
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
