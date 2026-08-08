import { motion } from 'framer-motion';
import { Camera, Monitor, Users, Building, Award, Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../utils/api';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await api.get('/gallery');
      if (response.data.success) {
        setGallery(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch gallery');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'All', icon: Camera },
    { id: 'classroom', name: 'Classroom', icon: Monitor },
    { id: 'lab', name: 'Computer Lab', icon: Monitor },
    { id: 'event', name: 'Events', icon: Users },
    { id: 'institute', name: 'Institute', icon: Building },
    { id: 'achievement', name: 'Achievements', icon: Award }
  ];

  const filteredGallery = filteredCategory === 'all' 
    ? gallery 
    : gallery.filter(item => item.category === filteredCategory);

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
            <h1 className="text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our institute facilities, events, and achievements through our photo gallery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-gray-900">Filter by Category:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilteredCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  filteredCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading gallery...</p>
            </div>
          ) : filteredGallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg card-3d bg-white"
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 relative">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                        onLoad={() => {
                          setLoadedImages(prev => ({ ...prev, [item._id]: true }));
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = document.getElementById(`fallback-${item._id}`);
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      id={`fallback-${item._id}`}
                      className={`absolute inset-0 flex items-center justify-center ${item.imageUrl && loadedImages[item._id] ? 'hidden' : 'flex'}`}
                    >
                      <Camera className="w-16 h-16 text-blue-600" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-blue-100 capitalize">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-24 h-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Photos Available</h3>
              <p className="text-gray-600">Check back later for new gallery uploads.</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Info */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Gallery Categories</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Browse through different categories to see various aspects of our institute
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(1).map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg card-3d"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  <category.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">
                  {category.id === 'classroom' && 'Photos of our modern classrooms and teaching facilities'}
                  {category.id === 'lab' && 'State-of-the-art computer labs with latest equipment'}
                  {category.id === 'event' && 'Memories from seminars, workshops, and functions'}
                  {category.id === 'institute' && 'Institute building and infrastructure'}
                  {category.id === 'achievement' && 'Awards and achievements of our students'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
