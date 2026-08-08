import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  Users,
  TrendingUp,
  ArrowRight,
  Star,
  Calendar,
  Bell,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Clock
} from 'lucide-react';
import api from '../utils/api';

const Home = () => {
  const [notifications, setNotifications] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchNotifications();
    fetchEvents();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      if (response.data.success) {
        setNotifications(response.data.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch notifications');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      if (response.data.success) {
        setEvents(response.data.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to fetch events');
    }
  };
  const courses = [
    {
      name: 'DCA',
      duration: '1 Year',
      fees: '₹13,999',
      bgImage: 'https://th.bing.com/th/id/OIP.NxrHWvNXg7uQRyFrHXAWKwAAAA?w=281&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    },
    {
      name: 'PGDCA',
      duration: '1 Year',
      fees: '₹15,999',
      bgImage: 'https://th.bing.com/th/id/OIP.ikHFeiYKitkCnojokad58wHaD0?w=322&h=179&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    },
    {
      name: 'BCA',
      duration: '3 Years',
      fees: '₹23,999/semester',
      bgImage: 'https://www.bing.com/th/id/OIP.DcZx8pkU1_pV9hvUWc6E-QHaF1?w=217&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3&r=0'
    },
    {
      name: 'Web Development',
      duration: '6 Months',
      fees: '₹12,000',
      bgImage: 'https://th.bing.com/th/id/OIP.Jg35DTU8xEFi-BbUaql9CQHaEI?w=331&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3'
    },
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      course: 'BCA',
      text: 'Excellent faculty and practical training. Got placed in a top IT company!',
      rating: 5
    },
    {
      name: 'Priya Patel',
      course: 'Web Development',
      text: 'The hands-on approach helped me master web development quickly.',
      rating: 5
    },
    {
      name: 'Amit Kumar',
      course: 'DCA',
      text: 'Best computer institute in the area. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  <Award className="w-4 h-4" />
                  <span>ISO Certified Institute</span>
                </motion.div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="gradient-text">Shree Sai</span>
                  <br />
                  Computer Education
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Empowering students with industry-ready skills in computer education.
                  Build your dream career with expert guidance and 100% placement assistance.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/registration" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                  <span>Register Now</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/courses" className="btn-secondary text-lg px-8 py-4">
                  View Courses
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">5000+</div>
                  <div className="text-gray-600 text-sm">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">95%</div>
                  <div className="text-gray-600 text-sm">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-gray-600 text-sm">Years Experience</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Institute Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-2xl card-3d">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    <img
                      src="/assests/Building_photos.png"
                      alt="Institute Building"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <Users className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-base font-bold text-gray-900 leading-snug">Dedicated Academic</div>
                      <div className="text-gray-600 text-sm">Expert Faculty</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-lg">
                      <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="text-2xl font-bold text-gray-900">100%</div>
                      <div className="text-gray-600 text-sm">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Institute Intro */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">About Our Institute</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Shree Sai Computer Education has been a pioneer in providing quality computer education
              for over 15 years, shaping the careers of thousands of students.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GraduationCap, title: 'Quality Education', desc: 'Industry-aligned curriculum with practical training' },
              { icon: Users, title: 'Expert Faculty', desc: 'Experienced teachers with industry knowledge' },
              { icon: Award, title: 'Certification', desc: 'Recognized certificates for better job prospects' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl shadow-lg card-3d"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Popular Courses</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Choose from a wide range of courses designed to meet industry demands
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group p-6 rounded-2xl shadow-xl card-3d overflow-hidden text-white flex flex-col justify-between border border-white/20 min-h-[260px]"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${course.bgImage}')` }}
                />
                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-gray-900/60 group-hover:from-gray-950 group-hover:via-gray-900/85 transition-colors duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl flex items-center justify-center mb-4 text-white shadow-md">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{course.name}</h3>
                  <div className="space-y-2 text-sm text-gray-200 font-medium">
                    <p className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-400" />
                      {course.duration}
                    </p>
                    <p className="flex items-center">
                      <Award className="w-4 h-4 mr-2 text-blue-400" />
                      {course.fees}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-6">
                  <Link to="/courses" className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-blue-500/25">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses" className="btn-secondary text-lg px-8 py-4 inline-flex items-center space-x-2">
              <span>View All Courses</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Us?</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We provide comprehensive education with focus on practical skills
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Practical Training', desc: 'Hands-on experience with real projects' },
              { title: 'Industry Experts', desc: 'Learn from professionals with years of experience' },
              { title: 'Placement Support', desc: '100% placement assistance for eligible students' },
              { title: 'Modern Labs', desc: 'State-of-the-art computer labs with latest software' },
              { title: 'Flexible Timings', desc: 'Morning, evening, and weekend batches available' },
              { title: 'Affordable Fees', desc: 'Quality education at reasonable prices' },
              { title: 'Certified Courses', desc: 'Government recognized certifications' },
              { title: 'Small Batches', desc: 'Personal attention to every student' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">Student Testimonials</h2>
            <p className="section-subtitle text-blue-200 max-w-2xl mx-auto">
              Hear from our successful students who are now working in top companies
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              >
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-100 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-blue-200 text-sm">{testimonial.course}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notifications & Events */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Notifications */}
            <div>
              <h2 className="section-title flex items-center">
                <Bell className="w-8 h-8 mr-3 text-blue-600" />
                Latest Notifications
              </h2>
              <div className="space-y-4 mt-8">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification._id || index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border-l-4 border-blue-600 flex items-start space-x-4"
                    >
                      <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{new Date(notification.createdAt).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-600">No notifications available.</p>
                )}
              </div>
              <Link to="/notifications" className="mt-6 inline-block btn-secondary">
                View All Notifications
              </Link>
            </div>

            {/* Events */}
            <div>
              <h2 className="section-title flex items-center">
                <Calendar className="w-8 h-8 mr-3 text-blue-600" />
                Upcoming Events
              </h2>
              <div className="space-y-4 mt-8">
                {events.length > 0 ? (
                  events.map((event, index) => (
                    <motion.div
                      key={event._id || index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border-l-4 border-green-600 flex items-start space-x-4"
                    >
                      <Calendar className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-600">No events available.</p>
                )}
              </div>
              <Link to="/events" className="mt-6 inline-block btn-secondary">
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Banner */}
      <section className="section bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-4xl font-bold mb-4">🎓 Special Offer!</h2>
            <p className="text-xl mb-8 text-blue-100">
              Get 20% OFF on all courses. Limited time offer. Register today!
            </p>
            <Link to="/registration" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center space-x-2">
              <span>Avail Offer</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Gallery Preview</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Take a look at our institute facilities and events
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://lh3.googleusercontent.com/grass-cs/ANxoTn0Q6LvmKc9tTVNPA32T2HMMsaNGeIOLefoPPKug9ikT91XImcq6dFfRWj0vxcme9tCZ_afxHRiD6HIkIL4p-u_O6AG4FgI7ZlffiKaUm5gLziMVBlOY6xTR8O8q-XkyJn-bMCZC=w449-h336-p-k-no',
              '/assests/lab1.png',
              'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
              '/assests/classroom.png'
            ].map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square rounded-xl overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-lg"
              >
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/gallery" className="btn-secondary">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Have questions? We're here to help you
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center card-3d"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600 text-sm">Shree Sai Computer Education, Bhaiyathan Road Surajpur , Infront of Shyam Bhandar </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center card-3d"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 text-sm">+91 93400 99523</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center card-3d"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 text-sm">info@shreesaicomputer.com</p>
            </motion.div>
          </div>
          <div className="text-center mt-10">
            <Link to="/contact" className="btn-primary text-lg px-8 py-4">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
