import { useState, useEffect } from 'react';
import { X, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [settings, setSettings] = useState({
    heading: 'Admissions Open - Register Now',
    message: 'Join Shree Sai Computer Education and build your career in IT. Limited seats available for the 2024-25 batch!',
    enabled: true,
    interval: 5
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopupSettings();
  }, []);

  const fetchPopupSettings = async () => {
    try {
      const response = await api.get('/popup-settings');
      if (response.data.success) {
        setSettings(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch popup settings');
    }
  };

  useEffect(() => {
    if (!settings.enabled) return;

    const intervalMs = settings.interval * 60 * 1000;
    
    // Show popup every X minutes
    const interval = setInterval(() => {
      setShowPopup(true);
    }, intervalMs);

    // Show popup after 30 seconds on first load
    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 30000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [settings.enabled, settings.interval]);

  if (!showPopup || !settings.enabled) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white relative">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center animate-float">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{settings.heading}</h3>
              <p className="text-blue-100 text-sm">Shree Sai Computer Education</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700 text-center mb-6">
            {settings.message}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                navigate('/registration');
                setShowPopup(false);
              }}
              className="w-full btn-primary py-3 text-lg"
            >
              Register Now
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="w-full btn-secondary py-3 text-lg"
            >
              Close
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-sm text-gray-500">
            🎓 100% Placement Assistance | 💼 Industry-Ready Skills
          </p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
