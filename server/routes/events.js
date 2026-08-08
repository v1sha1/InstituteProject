const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  deleteEvent,
  registerForEvent,
  updateEvent,
  getEventRegistrations,
  updateEventRegistration,
  deleteEventRegistration
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getEvents)
  .post(protect, admin, createEvent);

router.route('/:id')
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

router.post('/:id/register', registerForEvent);
router.get('/registrations/all', protect, admin, getEventRegistrations);
router.route('/registrations/:id')
  .put(protect, admin, updateEventRegistration)
  .delete(protect, admin, deleteEventRegistration);

module.exports = router;
