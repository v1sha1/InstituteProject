const express = require('express');
const router = express.Router();
const {
  generateCertificate,
  downloadCertificate,
  getStudentCertificates,
  verifyCertificate
} = require('../controllers/certificateController');
const { protect, admin } = require('../middleware/auth');

router.post('/generate', protect, admin, generateCertificate);
router.get('/download/:filename', protect, downloadCertificate);
router.get('/student/:studentId', protect, getStudentCertificates);
router.get('/verify/:certificateId', verifyCertificate);

module.exports = router;
