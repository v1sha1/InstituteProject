const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDir = path.join(__dirname, '../uploads');
const studentPhotosDir = path.join(uploadDir, 'students');
const documentsDir = path.join(uploadDir, 'documents');

[uploadDir, studentPhotosDir, documentsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage configuration for student photos
const photoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, studentPhotosDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'student-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Storage configuration for documents
const documentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, documentsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'doc-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and documents are allowed.'));
  }
};

// Multer instances
const uploadPhoto = multer({
  storage: photoStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

const uploadDocument = multer({
  storage: documentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// @desc    Upload student photo
// @route   POST /api/upload/photo
// @access  Private
exports.uploadStudentPhoto = async (req, res) => {
  try {
    uploadPhoto.single('photo')(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Photo uploaded successfully',
        data: {
          filename: req.file.filename,
          originalname: req.file.originalname,
          path: `/uploads/students/${req.file.filename}`,
          size: req.file.size
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

// @desc    Upload document
// @route   POST /api/upload/document
// @access  Private
exports.uploadDocument = async (req, res) => {
  try {
    uploadDocument.single('document')(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Document uploaded successfully',
        data: {
          filename: req.file.filename,
          originalname: req.file.originalname,
          path: `/uploads/documents/${req.file.filename}`,
          size: req.file.size
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

// @desc    Upload multiple documents
// @route   POST /api/upload/documents
// @access  Private
exports.uploadMultipleDocuments = async (req, res) => {
  try {
    uploadDocument.array('documents', 5)(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded'
        });
      }

      const files = req.files.map(file => ({
        filename: file.filename,
        originalname: file.originalname,
        path: `/uploads/documents/${file.filename}`,
        size: file.size
      }));

      res.status(200).json({
        success: true,
        message: 'Documents uploaded successfully',
        data: files
      });
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete file
// @route   DELETE /api/upload/file/:filename
// @access  Private/Admin
exports.deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    
    // Check both directories
    const photoPath = path.join(studentPhotosDir, filename);
    const docPath = path.join(documentsDir, filename);
    
    let filePath = null;
    if (fs.existsSync(photoPath)) {
      filePath = photoPath;
    } else if (fs.existsSync(docPath)) {
      filePath = docPath;
    }

    if (!filePath) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Export multer middleware for use in other routes
exports.uploadPhotoMiddleware = uploadPhoto;
exports.uploadDocumentMiddleware = uploadDocument;
