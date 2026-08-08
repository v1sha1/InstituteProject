const Fee = require('../models/Fee');
const User = require('../models/User');
const Course = require('../models/Course');

// @desc    Create fee record for a student
// @route   POST /api/fees
// @access  Private/Admin
exports.createFee = async (req, res) => {
  try {
    const { student, course, totalFees, installments } = req.body;

    // Check if fee record already exists
    const existingFee = await Fee.findOne({ student, course });
    if (existingFee) {
      return res.status(400).json({
        success: false,
        message: 'Fee record already exists for this student and course'
      });
    }

    // Calculate pending amount
    const paidAmount = 0;
    const pendingAmount = totalFees;

    // Create fee record
    const fee = await Fee.create({
      student,
      course,
      totalFees,
      paidAmount,
      pendingAmount,
      installments: installments || [],
      status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Fee record created successfully',
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all fee records
// @route   GET /api/fees
// @access  Private/Admin
exports.getFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate('student', 'name email mobile')
      .populate('course', 'name code')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: fees.length,
      data: fees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single fee record
// @route   GET /api/fees/:id
// @access  Private
exports.getFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id)
      .populate('student', 'name email mobile address')
      .populate('course', 'name code duration fees');

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get fee by student ID
// @route   GET /api/fees/student/:studentId
// @access  Private
exports.getStudentFee = async (req, res) => {
  try {
    const fee = await Fee.findOne({ student: req.params.studentId })
      .populate('course', 'name code duration fees');

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found for this student'
      });
    }

    res.status(200).json({
      success: true,
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update fee record
// @route   PUT /api/fees/:id
// @access  Private/Admin
exports.updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    res.status(200).json({
      success: true,
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete fee record
// @route   DELETE /api/fees/:id
// @access  Private/Admin
exports.deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Fee record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Process fee payment
// @route   POST /api/fees/:id/payment
// @access  Private/Admin
exports.processPayment = async (req, res) => {
  try {
    const { amount, paymentMethod, transactionId, installmentNumber } = req.body;
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    if (amount > fee.pendingAmount) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount exceeds pending amount'
      });
    }

    // Update fee record
    fee.paidAmount += amount;
    fee.pendingAmount -= amount;
    fee.lastPaymentDate = new Date();

    // Update installment if specified
    if (installmentNumber !== undefined && fee.installments[installmentNumber]) {
      fee.installments[installmentNumber].status = 'paid';
      fee.installments[installmentNumber].paidDate = new Date();
      fee.installments[installmentNumber].paymentMethod = paymentMethod;
      fee.installments[installmentNumber].transactionId = transactionId;
    }

    // Update overall status
    if (fee.pendingAmount === 0) {
      fee.status = 'complete';
    } else if (fee.paidAmount > 0) {
      fee.status = 'partial';
    }

    await fee.save();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add installment to fee record
// @route   POST /api/fees/:id/installments
// @access  Private/Admin
exports.addInstallment = async (req, res) => {
  try {
    const { amount, dueDate } = req.body;
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: 'Fee record not found'
      });
    }

    fee.installments.push({
      amount,
      dueDate,
      status: 'pending'
    });

    await fee.save();

    res.status(200).json({
      success: true,
      message: 'Installment added successfully',
      data: fee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get fee statistics
// @route   GET /api/fees/stats
// @access  Private/Admin
exports.getFeeStats = async (req, res) => {
  try {
    const fees = await Fee.find();
    
    const totalFees = fees.reduce((acc, fee) => acc + fee.totalFees, 0);
    const totalPaid = fees.reduce((acc, fee) => acc + fee.paidAmount, 0);
    const totalPending = fees.reduce((acc, fee) => acc + fee.pendingAmount, 0);
    
    const pendingFees = fees.filter(fee => fee.status === 'pending').length;
    const partialFees = fees.filter(fee => fee.status === 'partial').length;
    const completeFees = fees.filter(fee => fee.status === 'complete').length;

    // Overdue installments
    const overdueInstallments = fees.reduce((acc, fee) => {
      const overdue = fee.installments.filter(
        inst => inst.status === 'pending' && new Date(inst.dueDate) < new Date()
      );
      return acc + overdue.length;
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        totalFees,
        totalPaid,
        totalPending,
        pendingFees,
        partialFees,
        completeFees,
        overdueInstallments,
        collectionRate: totalFees > 0 ? ((totalPaid / totalFees) * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get overdue fees
// @route   GET /api/fees/overdue
// @access  Private/Admin
exports.getOverdueFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate('student', 'name email mobile')
      .populate('course', 'name code');

    const overdueFees = fees.filter(fee => {
      return fee.installments.some(
        inst => inst.status === 'pending' && new Date(inst.dueDate) < new Date()
      );
    });

    res.status(200).json({
      success: true,
      count: overdueFees.length,
      data: overdueFees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
