import { motion } from 'framer-motion';
import { GraduationCap, Target, Eye, Award, Users, Building, Trophy, BookOpen, Mic, UserCheck, HeartHandshake, Quote } from 'lucide-react';

const About = () => {
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
            <h1 className="text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Learn about our journey, mission, and commitment to excellence in computer education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Institute History */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Our History</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Shree Sai Computer Education was established in 2009 with a vision to provide quality
                  computer education to students from all walks of life. What started as a small training center
                  with just 10 computers has now grown into a premier institute with state-of-the-art facilities.
                </p>
                <p>
                  Over the past 15 years, we have trained over 5000 students who are now successfully working
                  in various IT companies across the country. Our commitment to practical training and industry
                  relevance has made us a preferred choice for computer education.
                </p>
                <p>
                  We have continuously evolved our curriculum to keep pace with the rapidly changing technology
                  landscape, ensuring our students are always industry-ready.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl"
            >
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
                  <div className="text-gray-600">Students Trained</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-gray-600">Placement Rate</div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-gray-600">Expert Faculty</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg card-3d"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide accessible, affordable, and quality computer education that empowers students
                with practical skills and knowledge, enabling them to build successful careers in the IT industry.
                We are committed to bridging the gap between academic learning and industry requirements.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-lg card-3d"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading computer education institute in the region, recognized for excellence in
                teaching, innovation in curriculum, and outstanding student outcomes. We aim to create a
                generation of skilled IT professionals who can contribute to the digital transformation of our nation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-12 rounded-3xl"
          >
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="w-48 h-48 bg-white/20 rounded-full mx-auto flex items-center justify-center overflow-hidden">
                  <img
                    src="/assests/vishal.png"
                    alt="Director"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Director's Message</h3>
                <p className="text-blue-100 leading-relaxed mb-6">
                  "Welcome to Shree Sai Computer Education. Our institute has been a beacon of quality
                  computer education for over 15 years. We believe that every student has the potential to
                  excel given the right guidance and resources. Our dedicated faculty and industry-aligned
                  curriculum ensure that our students are well-prepared for the challenges of the IT industry."
                </p>
                <p className="text-blue-100 leading-relaxed mb-6">
                  "We are committed to continuously improving our teaching methods and updating our courses
                  to match the latest industry trends. Join us and let us help you build a successful career
                  in the exciting field of information technology."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg">Director</div>
                    <div className="text-blue-200">Shree Sai Computer Education</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Guest Lectures Section */}
      <section className="section bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <Mic className="w-4 h-4" />
              <span>Industry Insights</span>
            </div>
            <h2 className="section-title">Guest Lectures & Eminent Speakers</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Regular interactive sessions with tech leaders and domain experts to motivate and broaden students' career horizons.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Rajesh Sharma',
                title: 'Senior AI Research Architect, Tech Corp',
                photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
                topic: 'Future of Artificial Intelligence & Machine Learning',
                quote: '“सफलता उसी को मिलती है जो नई तकनीकों को अपनाने से कभी नहीं डरते। लगातार सीखते रहें और नया करते रहें!”'
              },
              {
                name: 'Er. Sunita Menon',
                title: 'Lead Cloud Engineer, Global Solutions',
                photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
                topic: 'Career Paths in Web & Cloud Computing',
                quote: '“कोडिंग सिर्फ कोड लिखना नहीं है, यह समस्याओं को सुलझाने का एक नजरिया है। अपनी सोच को हमेशा रचनात्मक रखें।”'
              },
              {
                name: 'Prof. Alok Verma',
                title: 'Cybersecurity Analyst & Educator',
                photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
                topic: 'Ethical Hacking & Digital Safety',
                quote: '“डिजिटल युग में आपकी स्किल ही आपकी सबसे बड़ी ताकत है। मेहनत और अनुशासन से आप हर मुकाम हासिल कर सकते हैं।”'
              }
            ].map((guest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 card-3d"
              >
                <div>
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <img
                      src={guest.photo}
                      alt={guest.name}
                      className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow">
                      <Mic className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center">{guest.name}</h3>
                  <p className="text-blue-600 text-xs font-semibold text-center mt-1 mb-2">{guest.title}</p>
                  <span className="block text-center text-xs font-medium bg-blue-50 text-blue-700 px-3 py-1 rounded-full w-max mx-auto mb-4">
                    {guest.topic}
                  </span>
                  <div className="relative bg-gray-50 p-4 rounded-2xl border-l-4 border-blue-500 text-gray-700 italic text-sm leading-relaxed">
                    <Quote className="w-5 h-5 text-blue-400 mb-1" />
                    {guest.quote}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Mentors Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <UserCheck className="w-4 h-4" />
              <span>Success Stories</span>
            </div>
            <h2 className="section-title">Alumni Mentors</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Our successful alumni who are now guiding and mentoring the next generation of IT aspirants.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rahul Patel',
                role: 'Full Stack Web Developer at TCS',
                batch: 'DCA Batch 2021',
                photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
                quote: '“मैंने साईं कंप्यूटर से शुरुआत की थी। यहाँ के प्रैक्टिकल ज्ञान और शिक्षकों के सपोर्ट की वजह से आज मैं टॉप IT कंपनी में कार्यरत हूँ।”'
              },
              {
                name: 'Priya Saxena',
                role: 'Data Analyst at Infosys',
                batch: 'PGDCA Batch 2022',
                photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
                quote: '“कभी हार मत मानो। जब आप रोज़ थोड़ा-थोड़ा सीखते हैं, तो एक दिन बड़ा मुकाम हासिल कर लेते हैं। हमेशा खुद पर विश्वास रखें!”'
              },
              {
                name: 'Aman Gupta',
                role: 'Software Test Engineer at Wipro',
                batch: 'BCA Batch 2020',
                photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
                quote: '“यहाँ की लैब ट्रेनिंग और रेगुलर गाइडेन्स ने मुझे इंटरव्यू क्रैक करने में मदद की। सही मार्गदर्शन से हर सपना पूरा हो सकता है।”'
              }
            ].map((alumni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-green-50/50 to-white p-8 rounded-3xl shadow-xl border border-green-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 card-3d"
              >
                <div>
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <img
                      src={alumni.photo}
                      alt={alumni.name}
                      className="w-full h-full object-cover rounded-full border-4 border-green-500 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 bg-green-600 text-white p-1.5 rounded-full shadow">
                      <UserCheck className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center">{alumni.name}</h3>
                  <p className="text-green-600 text-xs font-semibold text-center mt-1">{alumni.role}</p>
                  <span className="block text-center text-xs font-medium text-gray-500 mb-4">{alumni.batch}</span>
                  <div className="relative bg-white p-4 rounded-2xl border-l-4 border-green-500 text-gray-700 italic text-sm leading-relaxed shadow-sm">
                    <Quote className="w-5 h-5 text-green-400 mb-1" />
                    {alumni.quote}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Counselors Section */}
      <section className="section bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-3">
              <HeartHandshake className="w-4 h-4" />
              <span>Personalized Guidance</span>
            </div>
            <h2 className="section-title">Student Counselors</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Dedicated counselors providing career roadmaps, academic support, and personal development mentorship.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mrs. Anjali Sharma',
                role: 'Head Career Counselor',
                specialty: 'Career Planning & Skill Selection',
                photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
                quote: '“हर बच्चा अपने आप में खास है। हमारा लक्ष्य आपकी क्षमताओं को पहचान कर आपको सही दिशा में आगे बढ़ाना है।”'
              },
              {
                name: 'Mr. Vikramaditya Singh',
                role: 'Personality & Soft Skills Coach',
                specialty: 'Interview Preparation & Confidence Building',
                photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                quote: '“तकनीकी ज्ञान के साथ-साथ आपका आत्मविश्वास ही आपकी सबसे बड़ी पहचान बनाता है। हमेशा सकारात्मक सोच रखें!”'
              },
              {
                name: 'Dr. Meenakshi Joshi',
                role: 'Student Growth & Counseling Advisor',
                specialty: 'Academic Stress Management & Guidance',
                photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400',
                quote: '“गलतियों से घबराएं नहीं, वे सीखने का हिस्सा हैं। हम हर कदम पर आपकी मदद के लिए आपके साथ खड़े हैं।”'
              }
            ].map((counselor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 card-3d"
              >
                <div>
                  <div className="relative w-28 h-28 mx-auto mb-6">
                    <img
                      src={counselor.photo}
                      alt={counselor.name}
                      className="w-full h-full object-cover rounded-full border-4 border-purple-500 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 bg-purple-600 text-white p-1.5 rounded-full shadow">
                      <HeartHandshake className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 text-center">{counselor.name}</h3>
                  <p className="text-purple-600 text-xs font-semibold text-center mt-1">{counselor.role}</p>
                  <span className="block text-center text-xs font-medium bg-purple-50 text-purple-700 px-3 py-1 rounded-full w-max mx-auto my-3">
                    {counselor.specialty}
                  </span>
                  <div className="relative bg-gray-50 p-4 rounded-2xl border-l-4 border-purple-500 text-gray-700 italic text-sm leading-relaxed">
                    <Quote className="w-5 h-5 text-purple-400 mb-1" />
                    {counselor.quote}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Faculty</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Meet our team of experienced and dedicated educators
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Mrs. Devmati', role: 'Senior Faculty - All Rounder', exp: '10 Years', photo: '/assests/Devmati_profile.png' },
              { name: 'Miss Talat Fatima', role: 'Faculty - All Rounder', exp: '5 Years', photo: '/assests/teachers_facilitys.png' },
              { name: 'Miss Sangeeta Sahu', role: 'Faculty - Lab Assistant', exp: '3 Years', photo: '/assests/Sangeeta_profile.png' },
              { name: 'Mr. Vishal Singh', role: 'Faculty - Programming', exp: '3 Years', photo: '/assests/Vishal_profile.png' },
              { name: 'Miss Priya Sahu', role: 'Faculty - Lab Assistant', exp: '2 Years', photo: '/assests/teachers_facilitys.png' },
              //  { name: 'Neha Gupta', role: 'Faculty - Computer Basics', exp: '5 Years', photo: '/assests/teachersday.png' }
            ].map((faculty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg card-3d text-center"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-blue-100">
                  <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{faculty.role}</p>
                <p className="text-gray-600 text-sm">{faculty.exp} Experience</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Infrastructure</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              State-of-the-art facilities for optimal learning experience
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building, title: 'Modern Classrooms', desc: 'Air-conditioned classrooms with projectors' },
              { icon: BookOpen, title: 'Computer Labs', desc: '50+ computers with latest software' },
              { icon: Users, title: 'Library', desc: 'Extensive collection of books and resources' },
              { icon: Trophy, title: 'Practical Labs', desc: 'Hands-on practice sessions' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg card-3d text-center"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section bg-gradient-to-br from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title text-white">Our Achievements</h2>
            <p className="section-subtitle text-blue-200 max-w-2xl mx-auto">
              Recognitions and milestones in our journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'ISO 9001:2015 Certified', desc: 'Quality Management System' },
              { title: 'Best Computer Institute 2023', desc: 'Awarded by Education Council' },
              { title: '5000+ Successful Placements', desc: 'Students placed in top companies' },
              { title: '100% Pass Rate', desc: 'Consistent academic excellence' }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 text-center"
              >
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                <p className="text-blue-200 text-sm">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
