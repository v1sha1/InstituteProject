import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Clock, DollarSign, Users, BookOpen, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const Courses = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHoardingImage = (course) => {
    if (course.imageUrl) return course.imageUrl;
    const name = (course.name || '').toUpperCase();
    
    if (name.includes('DCA') && !name.includes('PGDCA') && !name.includes('ADCA')) return '/assests/forDCA.png';
    if (name.includes('PGDCA')) return '/assests/forPGDCA.png';
    if (name.includes('BCA')) return '/assests/forBCA.png';
    if (name.includes('TALLY')) return '/assests/forTALLY.png';
    if (name.includes('WEB')) return '/assests/forWEBDEVELOPMENT.png';
    if (name.includes('AI') || name.includes('PROGRAMMING')) return '/assests/forAI.png';
    if (name.includes('GRAPHIC') || name.includes('DESIGN') || name.includes('GRAPHICS')) return '/assests/forDesign.png';
    
    return '/assests/advertisment.png';
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

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
            <h1 className="text-5xl font-bold mb-4">Our Courses</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our comprehensive range of computer courses designed for every skill level
            </p>
          </motion.div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.length > 0 ? (
              courses.map((course, index) => {
                const hoardingImg = getHoardingImage(course);
                return (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden card-3d flex flex-col justify-between"
                  >
                    {/* Course Banner / Hoarding */}
                    <div 
                      className="relative h-48 bg-gray-900 overflow-hidden cursor-pointer group"
                      onClick={() => setSelectedImage(hoardingImg)}
                    >
                      <img 
                        src={hoardingImg} 
                        alt={`${course.name} Hoarding`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/assests/advertisment.png';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-3">
                        <span className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                          Click to View Full Pamphlet
                        </span>
                      </div>
                    </div>

                    {/* Course Header */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 text-white">
                      <div className="flex items-start justify-between mb-2">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {course.code}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{course.name}</h3>
                      <p className="text-blue-100 text-sm">{course.description}</p>
                    </div>

                  {/* Course Body */}
                  <div className="p-6 space-y-4">
                    {/* Course Details */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">₹{course.fees?.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Eligibility */}
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <div className="flex items-center space-x-2 text-blue-700">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">Eligibility: {course.eligibility}</span>
                      </div>
                    </div>

                    {/* Syllabus Preview */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-gray-900">Syllabus</span>
                        </div>
                        <div className="space-y-2">
                          {course.syllabus.slice(0, 2).map((module, idx) => (
                            <div key={idx} className="text-sm">
                              <span className="font-medium text-gray-700">{module.module}:</span>
                              <span className="text-gray-600 ml-2">{module.topics?.slice(0, 2).join(', ')}...</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Career Opportunities */}
                    {course.careerOpportunities && course.careerOpportunities.length > 0 && (
                      <div>
                        <span className="font-semibold text-gray-900 text-sm">Career Opportunities:</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {course.careerOpportunities.slice(0, 3).map((career, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                              {career}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Course Footer */}
                  <div className="p-6 bg-gray-50 border-t">
                    <Link
                      to="/registration"
                      className="w-full btn-primary flex items-center justify-center space-x-2"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })
            ) : (
              <div className="col-span-3 text-center py-12">
                <GraduationCap className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Available</h3>
                <p className="text-gray-600">Check back later for new courses.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
<section className="section bg-white">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 rounded-3xl"
    >
      <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
      <p className="text-blue-100 mb-8">
        Register now and take the first step towards a successful career in IT
      </p>

      {/* NOTE paragraph with inline animation */}
      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <p
          style={{
            color: 'red',
            fontWeight: 'bold',
            display: 'inline-block',
            animation: 'rtl-scroll 10s linear infinite',
          }}
        >
          NOTE : If you want to know about more UG & PG courses, please contact us.
        </p>
      </div>

      <Link
        to="/registration"
        className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center space-x-2"
      >
        <span>Register Now</span>
        <ArrowRight className="w-5 h-5" />
      </Link>
    </motion.div>
  </div>

  {/* Inline CSS for animation */}
  <style>
    {`
      @keyframes rtl-scroll {
        from { transform: translateX(100%); }
        to { transform: translateX(-100%); }
      }
    `}
  </style>
</section>


      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-[90vh]">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImage}
                alt="Full size advertising"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Courses;
