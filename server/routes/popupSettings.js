const express = require('express');
const router = express.Router();
const { getPopupSettings, updatePopupSettings } = require('../controllers/popupSettingsController');
const { protect, admin } = require('../middleware/auth');

// Public route - get popup settings
router.get('/', getPopupSettings);

// Admin route - update popup settings
router.put('/', protect, admin, updatePopupSettings);

module.exports = router;
