const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide image title'],
    trim: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['classroom', 'lab', 'event', 'institute', 'achievement'],
    required: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide image URL']
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Gallery', gallerySchema);
