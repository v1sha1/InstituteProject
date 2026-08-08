import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ChevronRight, Calendar as CalendarIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    fatherName: '',
    course: '',
    mobile: '',
    email: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'seminar':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'workshop':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'annual-function':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'special-class':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'competition':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post(`/events/${selectedEvent._id}/register`, registrationForm);
      if (response.data.success) {
        toast.success('Registration successful!');
        setShowRegistrationModal(false);
        setRegistrationForm({
          name: '',
          fatherName: '',
          course: '',
          mobile: '',
          email: ''
        });
      }
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4">Events & Activities</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Participate in seminars, workshops, and various activities to enhance your learning
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div
                  key={event._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden card-3d"
                >
                  {/* Event Header */}
                  <div className={`p-6 ${getEventTypeColor(event.type)}`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getEventTypeColor(event.type)}`}>
                        {event.type}
                      </span>
                      {event.registrationRequired && (
                        <span className="bg-white/50 px-2 py-1 rounded text-xs">Registration Required</span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  </div>

                  {/* Event Body */}
                  <div className="p-6 space-y-4">
                    <p className="text-gray-600">{event.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span>{event.venue}</span>
                      </div>
                      {event.maxParticipants && (
                        <div className="flex items-center space-x-3 text-gray-700">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span>{event.registeredStudents?.length || 0} / {event.maxParticipants} Registered</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Event Footer */}
                  <div className="p-6 bg-gray-50 border-t">
                    <button 
                      onClick={() => handleRegister(event)}
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <span>Register Now</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Scheduled</h3>
              <p className="text-gray-600">Check back later for upcoming events and activities.</p>
            </div>
          )}
        </div>
      </section>

      {/* Event Types Info */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Types of Events</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We organize various types of events to enhance your learning experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { type: 'seminar', icon: Calendar, title: 'Seminars', desc: 'Expert talks on industry trends' },
              { type: 'workshop', icon: Users, title: 'Workshops', desc: 'Hands-on practical sessions' },
              { type: 'annual-function', icon: CalendarIcon, title: 'Annual Functions', desc: 'Cultural and technical fests' },
              { type: 'special-class', icon: Clock, title: 'Special Classes', desc: 'Extra learning sessions' },
              { type: 'competition', icon: Users, title: 'Competitions', desc: 'Coding and design contests' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-2xl shadow-lg card-3d ${getEventTypeColor(item.type)}`}
              >
                <item.icon className="w-8 h-8 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Event Registration</h3>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {selectedEvent && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-900">{selectedEvent.title}</p>
                <p className="text-sm text-gray-600">{new Date(selectedEvent.date).toLocaleDateString()}</p>
              </div>
            )}
            <form onSubmit={handleRegistrationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={registrationForm.name}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name *</label>
                <input
                  type="text"
                  required
                  value={registrationForm.fatherName}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, fatherName: e.target.value })}
                  className="input-field"
                  placeholder="Enter father's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                <select
                  required
                  value={registrationForm.course}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, course: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select course</option>
                  <option value="DCA">DCA</option>
                  <option value="PGDCA">PGDCA</option>
                  <option value="BCA">BCA</option>
                  <option value="B.Sc Computer Science">B.Sc Computer Science</option>
                  <option value="M.Sc Computer Science">M.Sc Computer Science</option>
                  <option value="ADCA">ADCA</option>
                  <option value="Tally">Tally</option>
                  <option value="Programming Courses">Programming Courses</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Graphic Design">Graphic Design</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={registrationForm.mobile}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, mobile: e.target.value })}
                  className="input-field"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                  className="input-field"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
