const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  examType: {
    type: String,
    enum: ['mid-term', 'final', 'assignment', 'practical'],
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  subjects: [{
    name: String,
    marksObtained: Number,
    totalMarks: Number,
    percentage: Number,
    grade: String
  }],
  totalMarksObtained: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pass', 'fail'],
    required: true
  },
  rank: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Result', resultSchema);
