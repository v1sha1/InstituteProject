const mongoose = require('mongoose');

const eventRegistrationSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide name']
  },
  fatherName: {
    type: String,
    required: [true, "Please provide father's name"]
  },
  course: {
    type: String,
    required: [true, 'Please provide course']
  },
  mobile: {
    type: String,
    required: [true, 'Please provide mobile number']
  },
  email: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'rejected'],
    default: 'pending'
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EventRegistration', eventRegistrationSchema);
