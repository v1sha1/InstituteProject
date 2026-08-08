import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  BookOpen, 
  Calendar, 
  Users,
  LogOut,
  Settings,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!token || !user || user.role !== 'teacher') {
        toast.error('Access denied. Teacher only.');
        navigate('/');
        return;
      }

      const response = await api.get(`/teachers/${user._id}/dashboard`);
      if (response.data.success) {
        setTeacherData(response.data.data);
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

  const teacher = teacherData?.teacher || {};
  const students = teacherData?.students || {};
  const recentAttendance = teacherData?.recentAttendance || [];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {teacher.name}!</h1>
              <p className="text-green-100">Teacher Dashboard</p>
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
                <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{teacher.name}</h3>
                <p className="text-gray-600 text-sm">{teacher.email}</p>
                <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mt-2">
                  {teacher.specialization || 'Teacher'}
                </span>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', icon: User, label: 'Overview' },
                  { id: 'students', icon: Users, label: 'My Students' },
                  { id: 'attendance', icon: Calendar, label: 'Attendance' },
                  { id: 'settings', icon: Settings, label: 'Settings' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                      activeTab === item.id 
                        ? 'bg-green-600 text-white' 
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
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                      <span className="text-2xl font-bold text-gray-900">{students.total || 0}</span>
                    </div>
                    <p className="text-gray-600 text-sm">Total Students</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                      <span className="text-2xl font-bold text-gray-900">{teacher.course?.name || 'N/A'}</span>
                    </div>
                    <p className="text-gray-600 text-sm">Assigned Course</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <Calendar className="w-8 h-8 text-purple-600" />
                      <span className="text-2xl font-bold text-gray-900">{recentAttendance.length}</span>
                    </div>
                    <p className="text-gray-600 text-sm">Recent Attendance</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Attendance</h3>
                  {recentAttendance.length > 0 ? (
                    <div className="space-y-4">
                      {recentAttendance.slice(0, 5).map((record, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                          {record.status === 'present' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{record.student?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-center py-8">No recent attendance records</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">My Students</h3>
                {students.list && students.list.length > 0 ? (
                  <div className="space-y-4">
                    {students.list.map((student) => (
                      <div key={student._id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <p className="text-sm text-gray-600">{student.mobile}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            student.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {student.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No students assigned yet.</p>
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance Records</h3>
                {recentAttendance.length > 0 ? (
                  <div className="space-y-4">
                    {recentAttendance.map((record, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{record.student?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{record.course?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{new Date(record.date).toLocaleDateString()}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                            record.status === 'present' ? 'bg-green-100 text-green-700' :
                            record.status === 'absent' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {record.status}
                          </span>
                        </div>
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
                      defaultValue={teacher.name}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={teacher.email}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                    <input
                      type="tel"
                      defaultValue={teacher.mobile}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                    <input
                      type="text"
                      defaultValue={teacher.qualification}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <input
                      type="text"
                      defaultValue={teacher.specialization}
                      className="input-field"
                    />
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

export default TeacherDashboard;
