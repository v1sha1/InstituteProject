import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, GraduationCap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Registration = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    email: '',
    mobile: '',
    dob: '',
    address: '',
    course: ''
  });
  const [errors, setErrors] = useState({});
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      if (response.data.success && response.data.data.length > 0) {
        setCourseList(response.data.data);
      } else {
        setCourseList([
          { _id: 'DCA', name: 'DCA' },
          { _id: 'PGDCA', name: 'PGDCA' },
          { _id: 'BCA', name: 'BCA' },
          { _id: 'B.Sc Computer Science', name: 'B.Sc Computer Science' },
          { _id: 'M.Sc Computer Science', name: 'M.Sc Computer Science' },
          { _id: 'Tally', name: 'Tally' },
          { _id: 'Programming Courses', name: 'Programming Courses' },
          { _id: 'Web Development', name: 'Web Development' },
          { _id: 'Graphic Design', name: 'Graphic Design' }
        ]);
      }
    } catch (err) {
      console.error('Failed to load courses:', err);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number is invalid';
    }
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.course) newErrors.course = 'Course selection is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const response = await api.post('/auth/register', formData);
      
      if (response.data.success) {
        toast.success('Registration request submitted successfully!');
        setIsSubmitted(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration submission failed');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Student Registration</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Fill in your details to submit your admission application to Shree Sai Computer Education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form / Success View */}
      <section className="section">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
          >
            {isSubmitted ? (
              <div className="text-center py-8 space-y-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">आवेदन सफलतापूर्वक भेज दिया गया है!</h2>
                <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
                  आपका रजिस्ट्रेशन फॉर्म एडमिन के पास भेज दिया गया है। एडमिन द्वारा आवेदन स्वीकार (Accept) किए जाने के बाद आपको एडमिशन कंफर्मेशन और लॉगिन डिटेल्स प्राप्त होगी।
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-left space-y-2 max-w-md mx-auto">
                  <p className="text-sm font-semibold text-blue-900">Registered Student Details:</p>
                  <p className="text-sm text-gray-700"><strong>Name:</strong> {formData.name}</p>
                  <p className="text-sm text-gray-700"><strong>Mobile:</strong> {formData.mobile}</p>
                  <p className="text-sm text-gray-700"><strong>Email:</strong> {formData.email}</p>
                  <p className="text-sm text-gray-700"><strong>Status:</strong> <span className="text-amber-600 font-semibold">Pending Admin Approval</span></p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={() => navigate('/')}
                    className="btn-primary px-8 py-3 text-lg"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <User className="w-6 h-6 mr-3 text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name *</label>
                      <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        className={`input-field ${errors.fatherName ? 'border-red-500' : ''}`}
                        placeholder="Enter father's name"
                      />
                      {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Mail className="w-6 h-6 mr-3 text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className={`input-field ${errors.mobile ? 'border-red-500' : ''}`}
                        placeholder="Enter 10-digit mobile number"
                      />
                      {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                    Additional Details
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className={`input-field ${errors.dob ? 'border-red-500' : ''}`}
                      />
                      {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className={`input-field ${errors.address ? 'border-red-500' : ''}`}
                        placeholder="Enter your full address"
                      ></textarea>
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3 text-blue-600" />
                    Course Selection
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className={`input-field ${errors.course ? 'border-red-500' : ''}`}
                    >
                      <option value="">Choose a course</option>
                      {courseList.map((c) => (
                        <option key={c._id || c.name} value={c._id || c.name}>
                          {c.name} {c.code ? `(${c.code})` : ''}
                        </option>
                      ))}
                    </select>
                    {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    className="mt-1 w-5 h-5 text-blue-600 rounded"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and conditions and privacy policy of Shree Sai Computer Education
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Submit Application</span>
                </button>

                {/* Login Link */}
                <p className="text-center text-gray-600">
                  Already registered?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Registration;
