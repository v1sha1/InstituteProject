import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  DollarSign, 
  Bell, 
  Calendar,
  Image,
  Award,
  LogOut,
  Settings,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Key,
  Mail,
  UserCheck,
  BarChart3,
  FileText,
  Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingAdmissions, setPendingAdmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [eventRegistrations, setEventRegistrations] = useState([]);
  const [editingRegistration, setEditingRegistration] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registrationForm, setRegistrationForm] = useState({
    name: '',
    fatherName: '',
    course: '',
    mobile: '',
    email: ''
  });
  const [contacts, setContacts] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  // New feature states
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [feeForm, setFeeForm] = useState({
    student: '',
    course: '',
    totalFees: ''
  });
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    qualification: '',
    experience: '',
    specialization: '',
    subjects: '',
    salary: ''
  });
  const [studentForm, setStudentForm] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
    fatherName: '',
    address: '',
    password: ''
  });
  const [showResultModal, setShowResultModal] = useState(false);
  const [results, setResults] = useState([]);
  const [resultForm, setResultForm] = useState({
    student: '',
    course: '',
    examType: 'mid-term',
    examDate: '',
    subjects: [],
    totalMarksObtained: 0,
    totalMarks: 100,
    percentage: 0,
    grade: 'A',
    status: 'pass'
  });

  // Fetch students when result modal opens
  useEffect(() => {
    if (showResultModal && students.length === 0) {
      fetchStudents();
    }
  }, [showResultModal]);
  
  // Modal states
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  
  // Form states
  const [notificationForm, setNotificationForm] = useState({ title: '', message: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', location: '', description: '', type: 'seminar' });
  const [galleryForm, setGalleryForm] = useState({ title: '', category: 'classroom', description: '', imageUrl: '' });
  const [courseForm, setCourseForm] = useState({ name: '', code: '', description: '', duration: '', fees: '', eligibility: '' });

  // Important Dates State
  const [importantDates, setImportantDates] = useState([]);
  const [showImportantDateModal, setShowImportantDateModal] = useState(false);
  const [editingImportantDate, setEditingImportantDate] = useState(null);
  const [importantDateForm, setImportantDateForm] = useState({
    event: '',
    date: '',
    status: 'Upcoming',
    order: 0
  });

  useEffect(() => {
    checkAdminAccess();
    fetchStats();
    if (activeTab === 'admissions') {
      fetchPendingAdmissions();
    }
    if (activeTab === 'students') {
      fetchStudents();
    }
    if (activeTab === 'courses') {
      fetchCourses();
    }
    if (activeTab === 'notifications') {
      fetchNotifications();
    }
    if (activeTab === 'events') {
      fetchEvents();
    }
    if (activeTab === 'gallery') {
      fetchGallery();
    }
    if (activeTab === 'events') {
      fetchEventRegistrations();
    }
    if (activeTab === 'event-registrations') {
      fetchEventRegistrations();
    }
    if (activeTab === 'contact') {
      fetchContacts();
    }
    if (activeTab === 'results') {
      fetchResults();
    }
    if (activeTab === 'fees') {
      fetchFees();
    }
    if (activeTab === 'attendance') {
      fetchAttendance();
    }
    if (activeTab === 'teachers') {
      fetchTeachers();
    }
    if (activeTab === 'analytics') {
      fetchAnalytics();
    }
    if (activeTab === 'important-dates') {
      fetchImportantDates();
    }
  }, [activeTab]);

  const fetchImportantDates = async () => {
    try {
      const response = await api.get('/important-dates');
      if (response.data.success) {
        setImportantDates(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch important dates:', error);
    }
  };

  const createImportantDate = async () => {
    try {
      const response = await api.post('/important-dates', importantDateForm);
      if (response.data.success) {
        toast.success('Important date created successfully');
        setShowImportantDateModal(false);
        setImportantDateForm({ event: '', date: '', status: 'Upcoming', order: 0 });
        fetchImportantDates();
      }
    } catch (error) {
      toast.error('Failed to create important date');
    }
  };

  const updateImportantDate = async () => {
    try {
      const response = await api.put(`/important-dates/${editingImportantDate._id}`, importantDateForm);
      if (response.data.success) {
        toast.success('Important date updated successfully');
        setShowImportantDateModal(false);
        setEditingImportantDate(null);
        setImportantDateForm({ event: '', date: '', status: 'Upcoming', order: 0 });
        fetchImportantDates();
      }
    } catch (error) {
      toast.error('Failed to update important date');
    }
  };

  const handleEditImportantDate = (item) => {
    setEditingImportantDate(item);
    setImportantDateForm({
      event: item.event,
      date: item.date,
      status: item.status || 'Upcoming',
      order: item.order || 0
    });
    setShowImportantDateModal(true);
  };

  const deleteImportantDate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this date entry?')) return;
    try {
      const response = await api.delete(`/important-dates/${id}`);
      if (response.data.success) {
        toast.success('Important date deleted successfully');
        fetchImportantDates();
      }
    } catch (error) {
      toast.error('Failed to delete important date');
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
      toast.error('Failed to fetch students');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch courses');
    }
  };

  const deleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      const response = await api.delete(`/students/${studentId}`);
      if (response.data.success) {
        toast.success('Student deleted successfully');
        fetchStudents();
      }
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const response = await api.delete(`/courses/${courseId}`);
      if (response.data.success) {
        toast.success('Course deleted successfully');
        fetchCourses();
      }
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await api.get('/notifications');
      if (response.data.success) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      toast.error('Failed to fetch notifications');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch events');
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await api.get('/gallery');
      if (response.data.success) {
        setGallery(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error);
      toast.error('Failed to fetch gallery');
    }
  };

  const fetchEventRegistrations = async () => {
    try {
      const response = await api.get('/events/registrations/all');
      if (response.data.success) {
        setEventRegistrations(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch event registrations:', error);
      toast.error('Failed to fetch event registrations');
    }
  };

  const updateEventRegistration = async () => {
    try {
      const response = await api.put(`/events/registrations/${editingRegistration._id}`, registrationForm);
      if (response.data.success) {
        toast.success('Registration updated successfully');
        setShowRegistrationModal(false);
        setEditingRegistration(null);
        setRegistrationForm({ name: '', fatherName: '', course: '', mobile: '', email: '' });
        fetchEventRegistrations();
      }
    } catch (error) {
      toast.error('Failed to update registration');
    }
  };

  const deleteEventRegistration = async (registrationId) => {
    if (!window.confirm('Are you sure you want to delete this registration?')) return;
    
    try {
      const response = await api.delete(`/events/registrations/${registrationId}`);
      if (response.data.success) {
        toast.success('Registration deleted successfully');
        fetchEventRegistrations();
      }
    } catch (error) {
      toast.error('Failed to delete registration');
    }
  };

  const handleEditRegistration = (registration) => {
    setEditingRegistration(registration);
    setRegistrationForm({
      name: registration.name,
      fatherName: registration.fatherName,
      course: registration.course,
      mobile: registration.mobile,
      email: registration.email || ''
    });
    setShowRegistrationModal(true);
  };

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contact');
      if (response.data.success) {
        setContacts(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      toast.error('Failed to fetch contacts');
    }
  };

  const updateContactStatus = async (contactId, status) => {
    try {
      const response = await api.put(`/contact/${contactId}`, { status });
      if (response.data.success) {
        toast.success('Contact status updated');
        fetchContacts();
      }
    } catch (error) {
      toast.error('Failed to update contact status');
    }
  };

  const deleteContact = async (contactId) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const response = await api.delete(`/contact/${contactId}`);
      if (response.data.success) {
        toast.success('Contact deleted successfully');
        fetchContacts();
      }
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const createStudent = async () => {
    try {
      const response = await api.post('/students', {
        ...studentForm,
        role: 'student',
        admissionStatus: 'approved'
      });
      if (response.data.success) {
        toast.success('Student added successfully');
        setShowStudentModal(false);
        setStudentForm({ name: '', email: '', mobile: '', course: '', fatherName: '', address: '', password: '' });
        fetchStudents();
      }
    } catch (error) {
      toast.error('Failed to add student');
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
    setStudentForm({
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      course: student.course?._id || student.course,
      fatherName: student.fatherName || '',
      address: student.address || '',
      password: ''
    });
    setShowStudentModal(true);
  };

  const updateStudent = async () => {
    try {
      const response = await api.put(`/students/${editingStudent._id}`, studentForm);
      if (response.data.success) {
        toast.success('Student updated successfully');
        setShowStudentModal(false);
        setEditingStudent(null);
        setStudentForm({ name: '', email: '', mobile: '', course: '', fatherName: '', address: '', password: '' });
        fetchStudents();
      }
    } catch (error) {
      toast.error('Failed to update student');
    }
  };

  const fetchResults = async () => {
    try {
      const response = await api.get('/results');
      if (response.data.success) {
        setResults(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch results:', error);
      toast.error('Failed to fetch results');
    }
  };

  const createResult = async () => {
    try {
      const response = await api.post('/results', resultForm);
      if (response.data.success) {
        toast.success('Result added successfully');
        setShowResultModal(false);
        setResultForm({
          student: '',
          course: '',
          examType: 'mid-term',
          examDate: '',
          subjects: [],
          totalMarksObtained: 0,
          totalMarks: 100,
          percentage: 0,
          grade: 'A',
          status: 'pass'
        });
        fetchResults();
      }
    } catch (error) {
      toast.error('Failed to add result');
    }
  };

  const deleteResult = async (resultId) => {
    if (!window.confirm('Are you sure you want to delete this result?')) return;
    
    try {
      const response = await api.delete(`/results/${resultId}`);
      if (response.data.success) {
        toast.success('Result deleted successfully');
        fetchResults();
      }
    } catch (error) {
      toast.error('Failed to delete result');
    }
  };

  // New feature fetch functions
  const fetchFees = async () => {
    try {
      const response = await api.get('/fees');
      if (response.data.success) {
        setFees(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch fees:', error);
      toast.error('Failed to fetch fees');
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await api.get('/attendance');
      if (response.data.success) {
        setAttendance(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      toast.error('Failed to fetch attendance');
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/teachers');
      if (response.data.success) {
        setTeachers(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch teachers:', error);
      toast.error('Failed to fetch teachers');
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics/dashboard');
      if (response.data.success) {
        setAnalytics(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      toast.error('Failed to fetch analytics');
    }
  };

  const createTeacher = async () => {
    try {
      const response = await api.post('/teachers', teacherForm);
      if (response.data.success) {
        toast.success('Teacher added successfully');
        setShowTeacherModal(false);
        setTeacherForm({
          name: '',
          email: '',
          mobile: '',
          password: '',
          qualification: '',
          experience: '',
          specialization: '',
          subjects: '',
          salary: ''
        });
        fetchTeachers();
      }
    } catch (error) {
      toast.error('Failed to add teacher');
    }
  };

  const deleteTeacher = async (teacherId) => {
    if (!window.confirm('Are you sure you want to delete this teacher?')) return;
    
    try {
      const response = await api.delete(`/teachers/${teacherId}`);
      if (response.data.success) {
        toast.success('Teacher deleted successfully');
        fetchTeachers();
      }
    } catch (error) {
      toast.error('Failed to delete teacher');
    }
  };

  const createFee = async () => {
    try {
      const response = await api.post('/fees', feeForm);
      if (response.data.success) {
        toast.success('Fee record created successfully');
        setShowFeeModal(false);
        setFeeForm({
          student: '',
          course: '',
          totalFees: ''
        });
        fetchFees();
      }
    } catch (error) {
      toast.error('Failed to create fee record');
    }
  };

  const deleteFee = async (feeId) => {
    if (!window.confirm('Are you sure you want to delete this fee record?')) return;
    
    try {
      const response = await api.delete(`/fees/${feeId}`);
      if (response.data.success) {
        toast.success('Fee record deleted successfully');
        fetchFees();
      }
    } catch (error) {
      toast.error('Failed to delete fee record');
    }
  };

  const createNotification = async () => {
    try {
      const response = await api.post('/notifications', notificationForm);
      if (response.data.success) {
        toast.success('Notification created successfully');
        setShowNotificationModal(false);
        setNotificationForm({ title: '', message: '' });
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to create notification');
    }
  };

  const createEvent = async () => {
    try {
      const response = await api.post('/events', {
        ...eventForm,
        venue: eventForm.location,
        date: new Date(eventForm.date)
      });
      if (response.data.success) {
        toast.success('Event created successfully');
        setShowEventModal(false);
        setEventForm({ title: '', date: '', time: '', location: '', description: '', type: 'seminar' });
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  const updateEvent = async () => {
    try {
      const response = await api.put(`/events/${editingEvent._id}`, {
        ...eventForm,
        venue: eventForm.location,
        date: new Date(eventForm.date)
      });
      if (response.data.success) {
        toast.success('Event updated successfully');
        setShowEventModal(false);
        setEditingEvent(null);
        setEventForm({ title: '', date: '', time: '', location: '', description: '', type: 'seminar' });
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to update event');
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      date: event.date ? event.date.split('T')[0] : '',
      time: event.time || '',
      location: event.venue || event.location || '',
      description: event.description || '',
      type: event.type || 'seminar'
    });
    setShowEventModal(true);
  };

  const createGalleryItem = async () => {
    try {
      const response = await api.post('/gallery', galleryForm);
      if (response.data.success) {
        toast.success('Photo uploaded successfully');
        setShowGalleryModal(false);
        setGalleryForm({ title: '', category: '', imageUrl: '' });
        fetchGallery();
      }
    } catch (error) {
      toast.error('Failed to upload photo');
    }
  };

  const updateGalleryItem = async () => {
    try {
      const response = await api.put(`/gallery/${editingGallery._id}`, galleryForm);
      if (response.data.success) {
        toast.success('Photo updated successfully');
        setShowGalleryModal(false);
        setEditingGallery(null);
        setGalleryForm({ title: '', category: '', imageUrl: '' });
        fetchGallery();
      }
    } catch (error) {
      toast.error('Failed to update photo');
    }
  };

  const handleEditGallery = (item) => {
    setEditingGallery(item);
    setGalleryForm({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl
    });
    setShowGalleryModal(true);
  };

  const createCourse = async () => {
    try {
      const response = await api.post('/courses', {
        ...courseForm,
        fees: Number(courseForm.fees)
      });
      if (response.data.success) {
        toast.success('Course created successfully');
        setShowCourseModal(false);
        setCourseForm({ name: '', code: '', description: '', duration: '', fees: '', eligibility: '' });
        fetchCourses();
      }
    } catch (error) {
      toast.error('Failed to create course');
    }
  };

  const updateCourse = async () => {
    try {
      const response = await api.put(`/courses/${editingCourse._id}`, {
        ...courseForm,
        fees: Number(courseForm.fees)
      });
      if (response.data.success) {
        toast.success('Course updated successfully');
        setShowCourseModal(false);
        setEditingCourse(null);
        setCourseForm({ name: '', code: '', description: '', duration: '', fees: '', eligibility: '' });
        fetchCourses();
      }
    } catch (error) {
      toast.error('Failed to update course');
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm({
      name: course.name,
      code: course.code,
      description: course.description,
      duration: course.duration,
      fees: course.fees,
      eligibility: course.eligibility
    });
    setShowCourseModal(true);
  };

  const deleteNotification = async (notificationId) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    
    try {
      const response = await api.delete(`/notifications/${notificationId}`);
      if (response.data.success) {
        toast.success('Notification deleted successfully');
        fetchNotifications();
      }
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      const response = await api.delete(`/events/${eventId}`);
      if (response.data.success) {
        toast.success('Event deleted successfully');
        fetchEvents();
      }
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  const deleteGalleryItem = async (galleryId) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;
    
    try {
      const response = await api.delete(`/gallery/${galleryId}`);
      if (response.data.success) {
        toast.success('Gallery item deleted successfully');
        fetchGallery();
      }
    } catch (error) {
      toast.error('Failed to delete gallery item');
    }
  };

  const resetStudentPassword = async (studentId) => {
    const newPassword = prompt('Enter new password for this student:');
    if (!newPassword) return;
    
    try {
      const response = await api.put(`/students/${studentId}/password`, { password: newPassword });
      if (response.data.success) {
        toast.success('Password reset successfully');
      }
    } catch (error) {
      toast.error('Failed to reset password');
    }
  };

  const fetchPendingAdmissions = async () => {
    try {
      const response = await api.get('/admissions/pending');
      if (response.data.success) {
        setPendingAdmissions(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch pending admissions:', error);
      toast.error('Failed to fetch pending admissions');
    }
  };

  const handleApprove = async (studentId) => {
    try {
      const response = await api.put(`/admissions/${studentId}/approve`);
      if (response.data.success) {
        toast.success('Admission approved successfully');
        fetchPendingAdmissions();
      }
    } catch (error) {
      toast.error('Failed to approve admission');
    }
  };

  const handleReject = async (studentId) => {
    try {
      const response = await api.put(`/admissions/${studentId}/reject`);
      if (response.data.success) {
        toast.success('Admission rejected');
        fetchPendingAdmissions();
      }
    } catch (error) {
      toast.error('Failed to reject admission');
    }
  };

  const checkAdminAccess = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      toast.error('Failed to fetch dashboard stats');
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
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-300">Manage institute operations</p>
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
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                  { id: 'students', icon: Users, label: 'Students' },
                  { id: 'teachers', icon: UserCheck, label: 'Teachers' },
                  { id: 'courses', icon: BookOpen, label: 'Courses' },
                  { id: 'admissions', icon: Users, label: 'Admissions' },
                  { id: 'important-dates', icon: Calendar, label: 'Admission Dates' },
                  { id: 'fees', icon: DollarSign, label: 'Fees' },
                  { id: 'attendance', icon: FileText, label: 'Attendance' },
                  { id: 'results', icon: Award, label: 'Results' },
                  { id: 'notifications', icon: Bell, label: 'Notifications' },
                  { id: 'events', icon: Calendar, label: 'Events' },
                  { id: 'event-registrations', icon: Users, label: 'Event Registrations' },
                  { id: 'contact', icon: Mail, label: 'Contact Messages' },
                  { id: 'gallery', icon: Image, label: 'Gallery' },
                  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
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
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats?.totalStudents || 0}</p>
                    <p className="text-gray-600 text-sm">Total Students</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-green-600" />
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats?.totalCourses || 0}</p>
                    <p className="text-gray-600 text-sm">Total Courses</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-yellow-600" />
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{stats?.pendingAdmissions || 0}</p>
                    <p className="text-gray-600 text-sm">Pending Admissions</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg card-3d">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="w-8 h-8 text-purple-600" />
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">₹{(stats?.totalRevenue || 0).toLocaleString()}</p>
                    <p className="text-gray-600 text-sm">Total Revenue</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button 
                      onClick={() => setShowStudentModal(true)}
                      className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Add Student</span>
                    </button>
                    <button 
                      onClick={() => setShowCourseModal(true)}
                      className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                    >
                      <Plus className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Add Course</span>
                    </button>
                    <button 
                      onClick={() => setShowNotificationModal(true)}
                      className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
                    >
                      <Bell className="w-5 h-5 text-purple-600" />
                      <span className="font-medium text-gray-900">Send Notification</span>
                    </button>
                  </div>
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Students</h3>
                  <button 
                    onClick={() => setShowStudentModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Student</span>
                  </button>
                </div>
                <div className="mb-4 flex items-center space-x-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search students..."
                      className="input-field pl-10"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Mobile</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Course</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {students.length > 0 ? (
                        students.map((student) => (
                          <tr key={student._id} className="hover:bg-gray-50">
                            <td className="px-4 py-4 font-medium text-gray-900">{student.name}</td>
                            <td className="px-4 py-4 text-gray-600">{student.email}</td>
                            <td className="px-4 py-4 text-gray-600">{student.mobile}</td>
                            <td className="px-4 py-4 text-gray-600">{student.course?.name || 'Not enrolled'}</td>
                            <td className="px-4 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                student.admissionStatus === 'approved' 
                                  ? 'bg-green-100 text-green-700' 
                                  : student.admissionStatus === 'rejected'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {student.admissionStatus || 'pending'}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex space-x-2">
                                <button 
                                  onClick={() => editStudent(student)}
                                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                >
                                  <Edit className="w-4 h-4 text-blue-600" />
                                </button>
                                <button 
                                  onClick={() => resetStudentPassword(student._id)}
                                  className="p-2 hover:bg-yellow-100 rounded-lg transition-colors"
                                  title="Reset Password"
                                >
                                  <Key className="w-4 h-4 text-yellow-600" />
                                </button>
                                <button 
                                  onClick={() => deleteStudent(student._id)}
                                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-8 text-center text-gray-600">
                            No students found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Courses</h3>
                  <button 
                    onClick={() => setShowCourseModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Course</span>
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <div key={course._id} className="bg-gray-50 p-4 rounded-xl">
                        <h4 className="font-semibold text-gray-900 mb-2">{course.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">Duration: {course.duration}</p>
                        <p className="text-sm text-gray-600 mb-3">Fees: ₹{course.fees?.toLocaleString()}</p>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleEditCourse(course)}
                            className="flex-1 p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            <Edit className="w-4 h-4 inline mr-1" /> Edit
                          </button>
                          <button 
                            onClick={() => deleteCourse(course._id)}
                            className="flex-1 p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8 text-gray-600">
                      No courses found
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Admissions Tab */}
            {activeTab === 'admissions' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Pending Admissions</h3>
                {pendingAdmissions.length > 0 ? (
                  <div className="space-y-4">
                    {pendingAdmissions.map((student) => (
                      <div key={student._id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div>
                          <h4 className="font-semibold text-gray-900">{student.name} - {student.course?.name || 'Not selected'}</h4>
                          <p className="text-sm text-gray-600">Email: {student.email}</p>
                          <p className="text-sm text-gray-600">Mobile: {student.mobile}</p>
                          <p className="text-sm text-gray-600">Applied on: {new Date(student.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(student._id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(student._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No pending admissions</p>
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Notifications</h3>
                  <button 
                    onClick={() => setShowNotificationModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Notification</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification._id} className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.description || notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{new Date(notification.createdAt).toLocaleDateString()}</p>
                          </div>
                          <button 
                            onClick={() => deleteNotification(notification._id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">No notifications found</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Events</h3>
                  <button 
                    onClick={() => setShowEventModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {events.length > 0 ? (
                    events.map((event) => (
                      <div key={event._id} className="p-4 bg-green-50 rounded-xl border border-green-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{event.title}</h4>
                            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">{event.location || event.venue}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleEditEvent(event)}
                              className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                            <button 
                              onClick={() => deleteEvent(event._id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">No events found</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Event Registrations Tab */}
            {activeTab === 'event-registrations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Event Registrations</h3>
                </div>
                {eventRegistrations.length > 0 ? (
                  <div className="space-y-4">
                    {eventRegistrations.map((registration) => (
                      <div key={registration._id} className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{registration.name}</h5>
                            <p className="text-sm text-gray-600">Father: {registration.fatherName}</p>
                            <p className="text-sm text-gray-600">Course: {registration.course}</p>
                            <p className="text-sm text-gray-600">Mobile: {registration.mobile}</p>
                            {registration.email && <p className="text-sm text-gray-600">Email: {registration.email}</p>}
                            <p className="text-xs text-gray-500 mt-2">
                              Event: {registration.event?.title || 'N/A'} | 
                              Registered: {new Date(registration.registeredAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end space-y-2 ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                              registration.status === 'confirmed' 
                                ? 'bg-green-100 text-green-700' 
                                : registration.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {registration.status}
                            </span>
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditRegistration(registration)}
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4 text-blue-600" />
                              </button>
                              <button 
                                onClick={() => deleteEventRegistration(registration._id)}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No event registrations yet</p>
                )}
              </motion.div>
            )}

            {/* Contact Messages Tab */}
            {activeTab === 'contact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Contact Messages</h3>
                </div>
                {contacts.length > 0 ? (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div key={contact._id} className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{contact.name}</h5>
                            <p className="text-sm text-gray-600">Email: {contact.email}</p>
                            <p className="text-sm text-gray-600">Phone: {contact.phone}</p>
                            <p className="text-sm text-gray-600">Subject: {contact.subject}</p>
                            <p className="text-sm text-gray-700 mt-2 bg-white p-2 rounded">{contact.message}</p>
                            <p className="text-xs text-gray-500 mt-2">
                              Received: {new Date(contact.createdAt).toLocaleDateString()} at {new Date(contact.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="flex flex-col items-end space-y-2 ml-4">
                            <select
                              value={contact.status}
                              onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                              className={`px-2 py-1 rounded-full text-xs capitalize border-0 ${
                                contact.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-700' 
                                  : contact.status === 'contacted'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-green-100 text-green-700'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                            </select>
                            <button 
                              onClick={() => deleteContact(contact._id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No contact messages yet</p>
                )}
              </motion.div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Gallery</h3>
                  <button 
                    onClick={() => {
                      setEditingGallery(null);
                      setGalleryForm({ title: '', category: 'classroom', description: '', imageUrl: '' });
                      setShowGalleryModal(true);
                    }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload / Add Photo</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.length > 0 ? (
                    gallery.map((item) => (
                      <div key={item._id} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group shadow border">
                        {item.imageUrl ? (
                          <img 
                            src={item.imageUrl} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            onError={(e) => {
                              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f3f4f6"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" font-size="12" fill="%239ca3af"%3EImage Error%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-500 text-sm">No Image</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex flex-col items-center justify-center p-2 text-white text-center">
                          <p className="font-bold text-xs line-clamp-1 mb-1">{item.title}</p>
                          <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full mb-2 capitalize">{item.category}</span>
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEditGallery(item)}
                              className="p-1.5 bg-white text-gray-900 rounded-lg hover:bg-gray-100"
                              title="Edit"
                            >
                              <Edit className="w-3.5 h-3.5 text-gray-900" />
                            </button>
                            <button 
                              onClick={() => deleteGalleryItem(item._id)}
                              className="p-1.5 bg-white text-red-600 rounded-lg hover:bg-gray-100"
                              title="Delete"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-4 text-center py-8 text-gray-600">
                      No gallery items found
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Important Dates Tab */}
            {activeTab === 'important-dates' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Manage Admission Important Dates</h3>
                    <p className="text-sm text-gray-500">Edit dates displayed in the Admission tab</p>
                  </div>
                  <button 
                    onClick={() => {
                      setEditingImportantDate(null);
                      setImportantDateForm({ event: '', date: '', status: 'Upcoming', order: importantDates.length + 1 });
                      setShowImportantDateModal(true);
                    }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Date Entry</span>
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {importantDates.length > 0 ? (
                    importantDates.map((item) => (
                      <div key={item._id} className="p-4 border rounded-xl flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white hover:border-blue-300 transition-colors">
                        <div>
                          <h4 className="font-bold text-gray-900">{item.event}</h4>
                          <p className="text-blue-600 font-semibold text-sm">{item.date}</p>
                          <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            item.status === 'Open' ? 'bg-green-100 text-green-800' :
                            item.status === 'Closed' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditImportantDate(item)}
                            className="p-2 hover:bg-blue-100 rounded-lg transition-colors border"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => deleteImportantDate(item._id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors border"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-8 col-span-2">No important dates added yet</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Results Tab */}
            {activeTab === 'results' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Manage Results</h3>
                  <button 
                    onClick={() => setShowResultModal(true)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Result</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {results.length > 0 ? (
                    results.map((result) => (
                      <div key={result._id} className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-semibold text-gray-900">{result.student?.name || 'Unknown'}</h5>
                            <p className="text-sm text-gray-600">Course: {result.course?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">Exam: {result.examType}</p>
                            <p className="text-sm text-gray-600">Date: {new Date(result.examDate).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-700 mt-2">
                              Marks: {result.totalMarksObtained}/{result.totalMarks} ({result.percentage}%)
                            </p>
                            <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs capitalize ${
                              result.status === 'pass' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {result.status} - Grade: {result.grade}
                            </span>
                          </div>
                          <button 
                            onClick={() => deleteResult(result._id)}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600 text-center py-8">No results found</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Fees Tab */}
            {activeTab === 'fees' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Fee Management</h3>
                  <button
                    onClick={() => setShowFeeModal(true)}
                    className="flex items-center space-x-2 btn-primary"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Fee</span>
                  </button>
                </div>
                {fees.length > 0 ? (
                  <div className="space-y-4">
                    {fees.map((fee) => (
                      <div key={fee._id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{fee.student?.name || 'N/A'}</p>
                            <p className="text-sm text-gray-600">{fee.course?.name || 'N/A'}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Paid: ₹{fee.paidAmount?.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">Pending: ₹{fee.pendingAmount?.toLocaleString()}</p>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                fee.status === 'complete' ? 'bg-green-100 text-green-700' :
                                fee.status === 'partial' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {fee.status}
                              </span>
                            </div>
                            <button 
                              onClick={() => deleteFee(fee._id)}
                              className="p-2 bg-red-100 rounded-lg hover:bg-red-200"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No fee records found</p>
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">Attendance Management</h3>
                {attendance.length > 0 ? (
                  <div className="space-y-4">
                    {attendance.map((record) => (
                      <div key={record._id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{record.student?.name || 'N/A'}</p>
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
                  <p className="text-gray-600 text-center py-8">No attendance records found</p>
                )}
              </motion.div>
            )}

            {/* Teachers Tab */}
            {activeTab === 'teachers' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Teacher Management</h3>
                  <button
                    onClick={() => setShowTeacherModal(true)}
                    className="flex items-center space-x-2 btn-primary"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Teacher</span>
                  </button>
                </div>
                {teachers.length > 0 ? (
                  <div className="space-y-4">
                    {teachers.map((teacher) => (
                      <div key={teacher._id} className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{teacher.name}</p>
                            <p className="text-sm text-gray-600">{teacher.email}</p>
                            <p className="text-sm text-gray-600">{teacher.specialization || 'N/A'}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200">
                              <Edit className="w-4 h-4 text-blue-600" />
                            </button>
                            <button 
                              onClick={() => deleteTeacher(teacher._id)}
                              className="p-2 bg-red-100 rounded-lg hover:bg-red-200"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">No teachers found</p>
                )}
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h3 className="text-xl font-bold text-gray-900">Advanced Analytics</h3>
                {analytics ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Student Statistics</h4>
                      <div className="space-y-2">
                        <p className="flex justify-between"><span>Total Students:</span> <span className="font-bold">{analytics.students.total}</span></p>
                        <p className="flex justify-between"><span>Active Students:</span> <span className="font-bold text-green-600">{analytics.students.active}</span></p>
                        <p className="flex justify-between"><span>New Students:</span> <span className="font-bold text-blue-600">{analytics.students.new}</span></p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Fee Statistics</h4>
                      <div className="space-y-2">
                        <p className="flex justify-between"><span>Total Revenue:</span> <span className="font-bold">₹{analytics.fees.total?.toLocaleString()}</span></p>
                        <p className="flex justify-between"><span>Collected:</span> <span className="font-bold text-green-600">₹{analytics.fees.collected?.toLocaleString()}</span></p>
                        <p className="flex justify-between"><span>Pending:</span> <span className="font-bold text-red-600">₹{analytics.fees.pending?.toLocaleString()}</span></p>
                        <p className="flex justify-between"><span>Collection Rate:</span> <span className="font-bold">{analytics.fees.collectionRate}%</span></p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Attendance Statistics</h4>
                      <div className="space-y-2">
                        <p className="flex justify-between"><span>Present:</span> <span className="font-bold text-green-600">{analytics.attendance.present}</span></p>
                        <p className="flex justify-between"><span>Absent:</span> <span className="font-bold text-red-600">{analytics.attendance.absent}</span></p>
                        <p className="flex justify-between"><span>Attendance Rate:</span> <span className="font-bold">{analytics.attendance.rate}%</span></p>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                      <h4 className="font-semibold text-gray-900 mb-4">Result Statistics</h4>
                      <div className="space-y-2">
                        <p className="flex justify-between"><span>Pass:</span> <span className="font-bold text-green-600">{analytics.results.pass}</span></p>
                        <p className="flex justify-between"><span>Fail:</span> <span className="font-bold text-red-600">{analytics.results.fail}</span></p>
                        <p className="flex justify-between"><span>Pass Rate:</span> <span className="font-bold">{analytics.results.passRate}%</span></p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">Loading analytics...</p>
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
                <h3 className="text-xl font-bold text-gray-900 mb-6">Admin Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institute Name</label>
                    <input
                      type="text"
                      defaultValue="Shree Sai Computer Education"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                    <input
                      type="email"
                      defaultValue="mmci1985@gmail.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      defaultValue="+91 8823885578"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Popup Heading</label>
                    <input
                      type="text"
                      defaultValue="Admissions Open - Register Now"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Popup Message</label>
                    <textarea
                      defaultValue="Join Shree Sai Computer Education and build your career in IT. Limited seats available for the 2024-25 batch!"
                      className="input-field"
                      rows="3"
                    />
                  </div>
                  <button className="btn-primary">Save Settings</button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Create Notification</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={notificationForm.title}
                  onChange={(e) => setNotificationForm({ ...notificationForm, title: e.target.value })}
                  className="input-field"
                  placeholder="Enter notification title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={notificationForm.message}
                  onChange={(e) => setNotificationForm({ ...notificationForm, message: e.target.value })}
                  className="input-field"
                  rows="4"
                  placeholder="Enter notification message"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={createNotification}
                  className="flex-1 btn-primary"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="input-field"
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={eventForm.time}
                  onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="input-field"
                  placeholder="Enter event location"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <select
                  value={eventForm.type}
                  onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                  className="input-field"
                >
                  <option value="seminar">Seminar</option>
                  <option value="workshop">Workshop</option>
                  <option value="annual-function">Annual Function</option>
                  <option value="special-class">Special Class</option>
                  <option value="competition">Competition</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Enter event description"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={editingEvent ? updateEvent : createEvent}
                  className="flex-1 btn-primary"
                >
                  {editingEvent ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={() => {
                    setShowEventModal(false);
                    setEditingEvent(null);
                    setEventForm({ title: '', date: '', time: '', location: '', description: '', type: 'seminar' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingGallery ? 'Edit Photo' : 'Upload Photo'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="input-field"
                  placeholder="Enter photo title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">Select category</option>
                  <option value="classroom">Classroom</option>
                  <option value="lab">Lab</option>
                  <option value="event">Event</option>
                  <option value="institute">Institute</option>
                  <option value="achievement">Achievement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={galleryForm.imageUrl}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  className="input-field"
                  placeholder="Enter image URL"
                />
                {galleryForm.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={galleryForm.imageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={editingGallery ? updateGalleryItem : createGalleryItem}
                  className="flex-1 btn-primary"
                >
                  {editingGallery ? 'Update' : 'Upload'}
                </button>
                <button
                  onClick={() => {
                    setShowGalleryModal(false);
                    setEditingGallery(null);
                    setGalleryForm({ title: '', category: '', imageUrl: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingCourse ? 'Edit Course' : 'Add Course'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Name</label>
                <input
                  type="text"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter course name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
                <input
                  type="text"
                  value={courseForm.code}
                  onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                  className="input-field"
                  placeholder="Enter course code"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Enter course description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                <input
                  type="text"
                  value={courseForm.duration}
                  onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                  className="input-field"
                  placeholder="Enter duration (e.g., 6 months)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fees (₹)</label>
                <input
                  type="number"
                  value={courseForm.fees}
                  onChange={(e) => setCourseForm({ ...courseForm, fees: e.target.value })}
                  className="input-field"
                  placeholder="Enter course fees"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
                <input
                  type="text"
                  value={courseForm.eligibility}
                  onChange={(e) => setCourseForm({ ...courseForm, eligibility: e.target.value })}
                  className="input-field"
                  placeholder="Enter eligibility criteria"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={editingCourse ? updateCourse : createCourse}
                  className="flex-1 btn-primary"
                >
                  {editingCourse ? 'Update' : 'Add Course'}
                </button>
                <button
                  onClick={() => {
                    setShowCourseModal(false);
                    setEditingCourse(null);
                    setCourseForm({ name: '', code: '', description: '', duration: '', fees: '', eligibility: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={studentForm.email}
                  onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                  className="input-field"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile *</label>
                <input
                  type="tel"
                  value={studentForm.mobile}
                  onChange={(e) => setStudentForm({ ...studentForm, mobile: e.target.value })}
                  className="input-field"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                <select
                  value={studentForm.course}
                  onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Course</option>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
                <input
                  type="text"
                  value={studentForm.fatherName}
                  onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                  className="input-field"
                  placeholder="Enter father's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                  className="input-field"
                  rows="2"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password {!editingStudent && '*'}</label>
                <input
                  type="password"
                  value={studentForm.password}
                  onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                  className="input-field"
                  placeholder={editingStudent ? "Leave blank to keep current password" : "Enter password"}
                  required={!editingStudent}
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={editingStudent ? updateStudent : createStudent}
                  className="flex-1 btn-primary"
                >
                  {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
                <button
                  onClick={() => {
                    setShowStudentModal(false);
                    setEditingStudent(null);
                    setStudentForm({ name: '', email: '', mobile: '', course: '', fatherName: '', address: '', password: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Result Modal */}
      {showResultModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Result</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
                <select
                  value={resultForm.student}
                  onChange={(e) => setResultForm({ ...resultForm, student: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Student</option>
                  {students.filter(s => s.role === 'student').map((student) => (
                    <option key={student._id} value={student._id}>{student.name} ({student.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                <select
                  value={resultForm.course}
                  onChange={(e) => setResultForm({ ...resultForm, course: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Type *</label>
                <select
                  value={resultForm.examType}
                  onChange={(e) => setResultForm({ ...resultForm, examType: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="mid-term">Mid-Term</option>
                  <option value="final">Final</option>
                  <option value="assignment">Assignment</option>
                  <option value="practical">Practical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exam Date *</label>
                <input
                  type="date"
                  value={resultForm.examDate}
                  onChange={(e) => setResultForm({ ...resultForm, examDate: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks Obtained *</label>
                <input
                  type="number"
                  value={resultForm.totalMarksObtained}
                  onChange={(e) => {
                    const marks = Number(e.target.value);
                    const percentage = (marks / resultForm.totalMarks) * 100;
                    setResultForm({ 
                      ...resultForm, 
                      totalMarksObtained: marks,
                      percentage: percentage.toFixed(2)
                    });
                  }}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks *</label>
                <input
                  type="number"
                  value={resultForm.totalMarks}
                  onChange={(e) => {
                    const total = Number(e.target.value);
                    const percentage = (resultForm.totalMarksObtained / total) * 100;
                    setResultForm({ 
                      ...resultForm, 
                      totalMarks: total,
                      percentage: percentage.toFixed(2)
                    });
                  }}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Grade *</label>
                <select
                  value={resultForm.grade}
                  onChange={(e) => setResultForm({ ...resultForm, grade: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="F">F</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status *</label>
                <select
                  value={resultForm.status}
                  onChange={(e) => setResultForm({ ...resultForm, status: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={createResult}
                  className="flex-1 btn-primary"
                >
                  Add Result
                </button>
                <button
                  onClick={() => {
                    setShowResultModal(false);
                    setResultForm({
                      student: '',
                      course: '',
                      examType: 'mid-term',
                      examDate: '',
                      subjects: [],
                      totalMarksObtained: 0,
                      totalMarks: 100,
                      percentage: 0,
                      grade: 'A',
                      status: 'pass'
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fee Modal */}
      {showFeeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Fee Record</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Student *</label>
                <select
                  value={feeForm.student}
                  onChange={(e) => setFeeForm({ ...feeForm, student: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>{student.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                <select
                  value={feeForm.course}
                  onChange={(e) => setFeeForm({ ...feeForm, course: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>{course.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Fees *</label>
                <input
                  type="number"
                  value={feeForm.totalFees}
                  onChange={(e) => setFeeForm({ ...feeForm, totalFees: e.target.value })}
                  className="input-field"
                  placeholder="Enter total fees"
                  required
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={createFee}
                  className="flex-1 btn-primary"
                >
                  Add Fee
                </button>
                <button
                  onClick={() => {
                    setShowFeeModal(false);
                    setFeeForm({
                      student: '',
                      course: '',
                      totalFees: ''
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Modal */}
      {showTeacherModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Teacher</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter teacher name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={teacherForm.email}
                  onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                  className="input-field"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile *</label>
                <input
                  type="tel"
                  value={teacherForm.mobile}
                  onChange={(e) => setTeacherForm({ ...teacherForm, mobile: e.target.value })}
                  className="input-field"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  value={teacherForm.password}
                  onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })}
                  className="input-field"
                  placeholder="Enter password"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                <input
                  type="text"
                  value={teacherForm.qualification}
                  onChange={(e) => setTeacherForm({ ...teacherForm, qualification: e.target.value })}
                  className="input-field"
                  placeholder="Enter qualification"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                <input
                  type="number"
                  value={teacherForm.experience}
                  onChange={(e) => setTeacherForm({ ...teacherForm, experience: e.target.value })}
                  className="input-field"
                  placeholder="Enter experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <input
                  type="text"
                  value={teacherForm.specialization}
                  onChange={(e) => setTeacherForm({ ...teacherForm, specialization: e.target.value })}
                  className="input-field"
                  placeholder="Enter specialization"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjects</label>
                <input
                  type="text"
                  value={teacherForm.subjects}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subjects: e.target.value })}
                  className="input-field"
                  placeholder="Enter subjects (comma separated)"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
                <input
                  type="number"
                  value={teacherForm.salary}
                  onChange={(e) => setTeacherForm({ ...teacherForm, salary: e.target.value })}
                  className="input-field"
                  placeholder="Enter salary"
                />
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={createTeacher}
                  className="flex-1 btn-primary"
                >
                  Add Teacher
                </button>
                <button
                  onClick={() => {
                    setShowTeacherModal(false);
                    setTeacherForm({
                      name: '',
                      email: '',
                      mobile: '',
                      password: '',
                      qualification: '',
                      experience: '',
                      specialization: '',
                      subjects: '',
                      salary: ''
                    });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Edit Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Edit Registration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={registrationForm.name}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, name: e.target.value })}
                  className="input-field"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Father's Name</label>
                <input
                  type="text"
                  value={registrationForm.fatherName}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, fatherName: e.target.value })}
                  className="input-field"
                  placeholder="Enter father's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course</label>
                <select
                  value={registrationForm.course}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, course: e.target.value })}
                  className="input-field"
                >
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  value={registrationForm.mobile}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, mobile: e.target.value })}
                  className="input-field"
                  placeholder="Enter mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                  onClick={updateEventRegistration}
                  className="flex-1 btn-primary"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setShowRegistrationModal(false);
                    setEditingRegistration(null);
                    setRegistrationForm({ name: '', fatherName: '', course: '', mobile: '', email: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingGallery ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Modern Computer Lab"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="input-field"
                >
                  <option value="classroom">Classroom</option>
                  <option value="lab">Computer Lab</option>
                  <option value="event">Event / Workshop</option>
                  <option value="institute">Institute Infrastructure</option>
                  <option value="achievement">Achievement / Awards</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL or Local Asset Path *</label>
                <input
                  type="text"
                  value={galleryForm.imageUrl}
                  onChange={(e) => setGalleryForm({ ...galleryForm, imageUrl: e.target.value })}
                  className="input-field"
                  placeholder="e.g. /assests/lab1.png or https://..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Preset Options: /assests/lab1.png, /assests/classroom.png, /assests/Building_photos.png, /assests/teachersday.png</p>
              </div>
              {galleryForm.imageUrl && (
                <div className="w-full h-32 rounded-lg overflow-hidden border bg-gray-100">
                  <img src={galleryForm.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={editingGallery ? updateGalleryItem : createGalleryItem}
                  className="flex-1 btn-primary"
                >
                  {editingGallery ? 'Update Photo' : 'Save Photo'}
                </button>
                <button
                  onClick={() => {
                    setShowGalleryModal(false);
                    setEditingGallery(null);
                    setGalleryForm({ title: '', category: 'classroom', description: '', imageUrl: '' });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Important Date Modal */}
      {showImportantDateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {editingImportantDate ? 'Edit Admission Date' : 'Add Admission Date'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  value={importantDateForm.event}
                  onChange={(e) => setImportantDateForm({ ...importantDateForm, event: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Admission Start"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Text *</label>
                <input
                  type="text"
                  value={importantDateForm.date}
                  onChange={(e) => setImportantDateForm({ ...importantDateForm, date: e.target.value })}
                  className="input-field"
                  placeholder="e.g. June 1, 2026"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  value={importantDateForm.status}
                  onChange={(e) => setImportantDateForm({ ...importantDateForm, status: e.target.value })}
                  className="input-field"
                >
                  <option value="Open">Open</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Position</label>
                <input
                  type="number"
                  value={importantDateForm.order}
                  onChange={(e) => setImportantDateForm({ ...importantDateForm, order: Number(e.target.value) })}
                  className="input-field"
                  placeholder="1"
                />
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={editingImportantDate ? updateImportantDate : createImportantDate}
                  className="flex-1 btn-primary"
                >
                  {editingImportantDate ? 'Update Entry' : 'Add Entry'}
                </button>
                <button
                  onClick={() => {
                    setShowImportantDateModal(false);
                    setEditingImportantDate(null);
                    setImportantDateForm({ event: '', date: '', status: 'Upcoming', order: 0 });
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
