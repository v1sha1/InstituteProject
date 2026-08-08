const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
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
  totalFees: {
    type: Number,
    required: true
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  pendingAmount: {
    type: Number,
    required: true
  },
  installments: [{
    amount: Number,
    dueDate: Date,
    paidDate: Date,
    status: {
      type: String,
      enum: ['pending', 'paid', 'overdue'],
      default: 'pending'
    },
    paymentMethod: String,
    transactionId: String
  }],
  status: {
    type: String,
    enum: ['pending', 'partial', 'complete'],
    default: 'pending'
  },
  lastPaymentDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Fee', feeSchema);
