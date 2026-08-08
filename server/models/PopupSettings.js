const mongoose = require('mongoose');

const popupSettingsSchema = new mongoose.Schema({
  heading: {
    type: String,
    default: 'Admissions Open - Register Now'
  },
  message: {
    type: String,
    default: 'New batches starting soon! Register now to avail early bird discounts.'
  },
  enabled: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5 // in minutes
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PopupSettings', popupSettingsSchema);
