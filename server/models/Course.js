const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide course name'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Please provide course code'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide course description']
  },
  duration: {
    type: String,
    required: [true, 'Please provide course duration']
  },
  fees: {
    type: Number,
    required: [true, 'Please provide course fees']
  },
  eligibility: {
    type: String,
    required: [true, 'Please provide eligibility criteria']
  },
  syllabus: [{
    module: String,
    topics: [String]
  }],
  careerOpportunities: [String],
  image: {
    type: String,
    default: '/images/default-course.jpg'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
