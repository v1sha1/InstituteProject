const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const Course = require('../models/Course');
const Result = require('../models/Result');

// Ensure certificates directory exists
const certificatesDir = path.join(__dirname, '../uploads/certificates');
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}

// @desc    Generate completion certificate for a student
// @route   POST /api/certificates/generate
// @access  Private/Admin
exports.generateCertificate = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);
    
    if (!student || !course) {
      return res.status(404).json({
        success: false,
        message: 'Student or course not found'
      });
    }

    // Check if student has completed the course (has passing results)
    const results = await Result.find({ student: studentId, course: courseId });
    const hasPassed = results.some(r => r.status === 'pass');

    if (!hasPassed) {
      return res.status(400).json({
        success: false,
        message: 'Student has not completed this course yet'
      });
    }

    // Generate PDF certificate
    const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
    const filename = `certificate-${student._id}-${course._id}-${Date.now()}.pdf`;
    const filepath = path.join(certificatesDir, filename);

    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Certificate design
    doc.fontSize(30).font('Helvetica-Bold').text('Certificate of Completion', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(16).font('Helvetica').text('This is to certify that', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(24).font('Helvetica-Bold').text(student.name, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(16).font('Helvetica').text('has successfully completed the course', { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(22).font('Helvetica-Bold').text(course.name, { align: 'center' });
    doc.moveDown();
    
    doc.fontSize(14).font('Helvetica').text(`Duration: ${course.duration}`, { align: 'center' });
    doc.moveDown(2);
    
    doc.fontSize(12).font('Helvetica').text(`Date: ${new Date().toLocaleDateString()}`, { align: 'center' });
    
    // Border
    doc.rect(50, 50, doc.page.width - 100, doc.page.height - 100).stroke();

    doc.end();

    stream.on('finish', () => {
      res.status(200).json({
        success: true,
        message: 'Certificate generated successfully',
        data: {
          filename,
          path: `/uploads/certificates/${filename}`,
          downloadUrl: `/api/certificates/download/${filename}`
        }
      });
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Download certificate
// @route   GET /api/certificates/download/:filename
// @access  Private
exports.downloadCertificate = async (req, res) => {
  try {
    const { filename } = req.params;
    const filepath = path.join(certificatesDir, filename);

    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        message: 'Certificate not found'
      });
    }

    res.download(filepath, filename);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all certificates for a student
// @route   GET /api/certificates/student/:studentId
// @access  Private
exports.getStudentCertificates = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    
    // Get all results where student passed
    const results = await Result.find({ student: studentId, status: 'pass' })
      .populate('course', 'name code duration');

    const certificates = results.map(result => ({
      courseId: result.course._id,
      courseName: result.course.name,
      courseCode: result.course.code,
      completionDate: result.createdAt,
      grade: result.grade,
      percentage: result.percentage
    }));

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Verify certificate
// @route   GET /api/certificates/verify/:certificateId
// @access  Public
exports.verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;
    
    // In a real implementation, you would have a Certificate model
    // For now, we'll verify by checking if the result exists
    const result = await Result.findById(certificateId)
      .populate('student', 'name email')
      .populate('course', 'name code');

    if (!result || result.status !== 'pass') {
      return res.status(404).json({
        success: false,
        message: 'Invalid certificate'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Certificate is valid',
      data: {
        studentName: result.student.name,
        courseName: result.course.name,
        courseCode: result.course.code,
        completionDate: result.createdAt,
        grade: result.grade,
        percentage: result.percentage
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
