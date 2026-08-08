const ImportantDate = require('../models/ImportantDate');

// @desc    Get all important dates
// @route   GET /api/important-dates
// @access  Public
exports.getImportantDates = async (req, res) => {
  try {
    const dates = await ImportantDate.find({ isActive: true }).sort('order createdAt');
    res.status(200).json({
      success: true,
      count: dates.length,
      data: dates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new important date
// @route   POST /api/important-dates
// @access  Private/Admin
exports.createImportantDate = async (req, res) => {
  try {
    const dateItem = await ImportantDate.create(req.body);
    res.status(201).json({
      success: true,
      data: dateItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update important date
// @route   PUT /api/important-dates/:id
// @access  Private/Admin
exports.updateImportantDate = async (req, res) => {
  try {
    const dateItem = await ImportantDate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!dateItem) {
      return res.status(404).json({
        success: false,
        message: 'Important date not found'
      });
    }
    res.status(200).json({
      success: true,
      data: dateItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete important date
// @route   DELETE /api/important-dates/:id
// @access  Private/Admin
exports.deleteImportantDate = async (req, res) => {
  try {
    const dateItem = await ImportantDate.findByIdAndDelete(req.params.id);
    if (!dateItem) {
      return res.status(404).json({
        success: false,
        message: 'Important date not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Important date deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
