const express = require('express');
const router = express.Router();
const {
  uploadStudentPhoto,
  uploadDocument,
  uploadMultipleDocuments,
  deleteFile
} = require('../controllers/uploadController');
const { protect, admin } = require('../middleware/auth');

router.post('/photo', protect, uploadStudentPhoto);
router.post('/document', protect, uploadDocument);
router.post('/documents', protect, uploadMultipleDocuments);
router.delete('/file/:filename', protect, admin, deleteFile);

module.exports = router;
