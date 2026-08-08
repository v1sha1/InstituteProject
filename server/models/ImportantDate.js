const mongoose = require('mongoose');

const importantDateSchema = new mongoose.Schema({
  event: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Please provide date text'],
    trim: true
  },
  status: {
    type: String,
    enum: ['Open', 'Upcoming', 'Closed'],
    default: 'Upcoming'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ImportantDate', importantDateSchema);
