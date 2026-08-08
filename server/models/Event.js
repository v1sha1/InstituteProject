const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide event description']
  },
  type: {
    type: String,
    enum: ['seminar', 'workshop', 'annual-function', 'special-class', 'competition'],
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please provide event date']
  },
  time: {
    type: String,
    required: [true, 'Please provide event time']
  },
  venue: {
    type: String,
    required: [true, 'Please provide event venue']
  },
  image: {
    type: String
  },
  registrationRequired: {
    type: Boolean,
    default: false
  },
  maxParticipants: {
    type: Number
  },
  registeredStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
