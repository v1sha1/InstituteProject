const PopupSettings = require('../models/PopupSettings');

// Get popup settings
exports.getPopupSettings = async (req, res) => {
  try {
    let settings = await PopupSettings.findOne();
    
    if (!settings) {
      settings = await PopupSettings.create({});
    }
    
    res.json({
      success: true,
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch popup settings',
      error: error.message
    });
  }
};

// Update popup settings (Admin only)
exports.updatePopupSettings = async (req, res) => {
  try {
    const { heading, message, enabled, interval } = req.body;
    
    let settings = await PopupSettings.findOne();
    
    if (!settings) {
      settings = await PopupSettings.create({
        heading,
        message,
        enabled,
        interval
      });
    } else {
      settings.heading = heading || settings.heading;
      settings.message = message || settings.message;
      settings.enabled = enabled !== undefined ? enabled : settings.enabled;
      settings.interval = interval || settings.interval;
      
      await settings.save();
    }
    
    res.json({
      success: true,
      data: settings,
      message: 'Popup settings updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update popup settings',
      error: error.message
    });
  }
};
