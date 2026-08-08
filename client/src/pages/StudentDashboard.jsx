import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  Award, 
  Bell,
  LogOut,
  Settings,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!token || !user) {
        navigate('/login');
        return;
      }

      const response = await api.get(`/students/${user._id}/dashboard`);
      if (response.data.success) {
        setStudentData(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const student = studentData?.student || {};
  const fee = studentData?.fee || {};
  const attendance = studentData?.attendance || [];
  const results = studentData?.results || [];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {student.name}!</h1>
              <p className="text-blue-100">Student Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{student.name}</h3>
                <p className="text-gray-600 text-sm">{student.email}</p>
                <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm mt-2">
                  {student.course?.name || 'Not Enrolled'}
                </span>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', icon: User, label: 'Overview' },
                  { id: 'courses', icon: BookOpen, label: 'My Courses' },
                  { id: 'attendance', icon: Calendar, label: 'Attendance' },
                  { id: 'fees', icon: DollarSign, label: 'Fee Status' },
                  { id: 'results', icon: Award, label: 'Results' },
                  { id: 'notifications', icon: Bell, label: 'Notifications' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                      <span className="text-2xl font-bold text-gray-900">1</span>
                    </div>
                    <p className="text-gray-600 text-sm">Active Course</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="w-8 h-8 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        {attendance.filter(a => a.status === 'present').length}/{attendance.length}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Attendance</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="w-8 h-8 text-yellow-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        {fee.status || 'Pending'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Fee Status</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="w-8 h-8 text-purple-600" />
                      <span className="text-2xl font-bold text-gray-900">
                        {results.length}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">Results</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">Class Attended</p>
                        <p className="text-sm text-gray-600">Web Development - Today</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-xl">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-900">Assignment Submitted</p>
                        <p className="text-sm text-gray-600">Programming - Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">My Course</h3>
                {student.course ? (
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-2">{student.course.name}</h4>
                        <p className="text-gray-600">{student.course.description}</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white p-4 rounded-xl">
                        <p className="text-sm text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-900">{student.course.duration}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl">
                        <p className="text-sm text-gray-600">Fees</p>
                        <p className="font-semibold text-gray-900">₹{student.course.fees?.toLocaleString()}</p>
                      </div>
                      <div className="bg-white p-4 rounded-xl">
                        <p className="text-sm text-gray-600">Progress</p>
                        <p className="font-semibold text-gray-900">65%</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">You are not enrolled in any course yet.</p>
                    <button
                      onClick={() => navigate('/courses')}
                      className="btn-primary"
                    >
                      Browse Courses
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Attendance Tab */}
            {activeTab === 'attendance' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance Record</h3>
                {attendance.length > 0 ? (
                  <div className="space-y-3">
                    {attendance.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="flex items-center space-x-4">
                          {record.status === 'present' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : record.status === 'absent' ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-yellow-600" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(record.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </p>
                            <p className="text-sm text-gray-600">{record.remarks || 'No remarks'}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                          record.status === 'present' 
                            ? 'bg-green-100 text-green-700' 
                            : record.status === 'absent'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No attendance records available.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Fees Tab */}
            {activeTab === 'fees' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Fee Status</h3>
                {fee ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total Fees</p>
                          <p className="text-2xl font-bold text-gray-900">₹{fee.totalFees?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
                          <p className="text-2xl font-bold text-green-600">₹{fee.paidAmount?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Pending Amount</p>
                          <p className="text-2xl font-bold text-red-600">₹{fee.pendingAmount?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Installments</h4>
                      {fee.installments?.length > 0 ? (
                        <div className="space-y-3">
                          {fee.installments.map((installment, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                            >
                              <div>
                                <p className="font-medium text-gray-900">Installment {index + 1}</p>
                                <p className="text-sm text-gray-600">
                                  Due: {new Date(installment.dueDate).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">₹{installment.amount?.toLocaleString()}</p>
                                <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                  installment.status === 'paid' 
                                    ? 'bg-green-100 text-green-700' 
                                    : installment.status === 'overdue'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                }`}>
                                  {installment.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-600">No installments available.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No fee information available.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Results Tab */}
            {activeTab === 'results' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Results</h3>
                {results.length > 0 ? (
                  <div className="space-y-4">
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">{result.examType}</h4>
                            <p className="text-sm text-gray-600">
                              {new Date(result.examDate).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            result.status === 'pass' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {result.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Marks Obtained</p>
                            <p className="font-bold text-gray-900">{result.totalMarksObtained}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Total Marks</p>
                            <p className="font-bold text-gray-900">{result.totalMarks}</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Percentage</p>
                            <p className="font-bold text-gray-900">{result.percentage}%</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="text-sm text-gray-600">Grade</p>
                            <p className="font-bold text-gray-900">{result.grade}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No results available yet.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                    <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">New Batch Starting</p>
                      <p className="text-sm text-gray-600">Web Development batch starts from July 1st</p>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl">
                    <Bell className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Fee Reminder</p>
                      <p className="text-sm text-gray-600">Please pay your pending fee before July 15th</p>
                      <p className="text-xs text-gray-500 mt-1">5 days ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={student.name}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={student.email}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                    <input
                      type="tel"
                      defaultValue={student.mobile}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <textarea
                      defaultValue={student.address}
                      rows="3"
                      className="input-field"
                    ></textarea>
                  </div>
                  <button className="btn-primary">Save Changes</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
