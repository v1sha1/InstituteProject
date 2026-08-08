import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, Upload, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const Admission = () => {
  const [importantDates, setImportantDates] = useState([
    { event: 'Admission Start', date: 'June 1, 2026', status: 'Open' },
    { event: 'Admission End', date: 'July 31, 2026', status: 'Upcoming' },
    { event: 'Session Start', date: 'August 1, 2026', status: 'Upcoming' },
    { event: 'Last Admission', date: 'August 15, 2026', status: 'Upcoming' }
  ]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await api.get('/important-dates');
        if (response.data.success && response.data.data.length > 0) {
          setImportantDates(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch important dates:', err);
      }
    };
    fetchDates();
  }, []);
  const admissionProcess = [
    { step: 1, title: 'Fill Application Form', desc: 'Complete the online registration form with accurate details' },
    { step: 2, title: 'Submit Documents', desc: 'Upload required documents for verification' },
    { step: 3, title: 'Pay Registration Fee', desc: 'Pay the registration fee to confirm your application' },
    // { step: 4, title: 'Counseling Session', desc: 'Attend counseling session for course selection' },
    { step: 5, title: 'Admission Confirmation', desc: 'Receive admission confirmation and join the batch' }
  ];

  const requiredDocuments = [
    'Passport size photograph (2 copies)',
    'Aadhar Card / Voter ID / Passport',
    '10th Mark Sheet & Certificate',
    '12th Mark Sheet & Certificate (if applicable)',
    'Graduation Certificate (for PG courses)',
    // 'Transfer Certificate (TC)',
    // 'Character Certificate',
    'Recent passport size photograph'
  ];

  const feeStructure = [
    { course: 'DCA', total: 13999, registration: 5000, first: 4500, second: 4500 },
    { course: 'PGDCA', total: 15999, registration: 7000, first: 4500, second: 4500 },
    { course: 'BCA', total: 22999, registration: 10000, first: 6500, second: 6500 },
    // { course: 'B.Sc', total: 50000, registration: 5000, first: 22500, second: 22500 },
    // { course: 'M.Sc', total: 60000, registration: 6000, first: 27000, second: 27000 },
    // { course: 'ADCA', total: 12000, registration: 1500, first: 5250, second: 5250 },
    { course: 'Tally', total: 5999, registration: 3000, first: 1500, second: 1500 },
    { course: 'AI', total: 7999, registration: 3500, first: 2250, second: 2250 },
    { course: 'Web Development', total: 5999, registration: 3000, first: 1500, second: 1500 },
    // { course: 'Graphic Design', total: 8000, registration: 1000, first: 3500, second: 3500 }
  ];

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
            <h1 className="text-5xl font-bold mb-4">Admission Process</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Simple and transparent admission process to start your journey with us
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Admission Process</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Follow these simple steps to secure your admission
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {admissionProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg card-3d h-full">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {index < admissionProcess.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-blue-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Required Documents</h2>
              <p className="text-gray-600 mb-8">
                Please ensure you have the following documents ready for admission:
              </p>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-md"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{doc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl text-white"
            >
              <div className="flex items-center space-x-4 mb-6">
                <Upload className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold">Document Upload</h3>
                  <p className="text-blue-200">Upload during registration</p>
                </div>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Accepted formats: PDF, JPG, PNG</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Maximum file size: 2MB per document</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Clear and readable scans required</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Eligibility Criteria</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Check the eligibility requirements for different courses
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { course: 'DCA', eligibility: '12th Pass from Any recognized board' },
              { course: 'PGDCA', eligibility: 'Graduate in any stream' },
              { course: 'BCA', eligibility: '12th Pass with Math/Computer Science' },
              // { course: 'B.Sc Computer Science', eligibility: '12th Science with Math/Computer Science' },
              // { course: 'M.Sc Computer Science', eligibility: 'B.Sc Computer Science / BCA' },
              // { course: 'MA Computer Applications', eligibility: 'Graduate in any stream with Computer Knowledge' },
              // { course: 'ADCA', eligibility: '12th Pass' },
              { course: 'Tally', eligibility: 'Basic Computer Knowledge' },
              { course: 'AI', eligibility: '10th/12th Pass with Basic Computer Knowledge' },
              { course: 'Web Development', eligibility: '10th/12th Pass' },
              // { course: 'Graphic Design', eligibility: '10th Pass' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg card-3d"
              >
                <FileText className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.course}</h3>
                <p className="text-gray-600 text-sm">{item.eligibility}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="section bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Fee Structure</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Transparent and affordable fee structure for all courses
            </p>
          </div>
          <div className="overflow-x-auto">
            <motion.table
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-full bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Course</th>
                  <th className="px-6 py-4 text-center font-semibold">Total Fee</th>
                  <th className="px-6 py-4 text-center font-semibold">Registration</th>
                  <th className="px-6 py-4 text-center font-semibold">1st Installment</th>
                  <th className="px-6 py-4 text-center font-semibold">2nd Installment</th>
                </tr>
              </thead>
              <tbody>
                {feeStructure.map((fee, index) => (
                  <tr key={index} className="border-b hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{fee.course}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="flex items-center justify-center space-x-1">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <span>{fee.total.toLocaleString()}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-green-600 font-medium">{fee.registration.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">{fee.first.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">{fee.second.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </motion.table>
          </div>
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
            <p className="text-yellow-800">
              <strong>Note:</strong> Fees can be paid in cash or online transfer.
              Registration fee must be paid at the time of admission.
              Installment options available for eligible students.
            </p>
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Important Dates</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Mark these important dates for the upcoming academic session
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {importantDates.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg card-3d text-center"
              >
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{item.event}</h3>
                <p className="text-blue-600 font-bold text-lg mb-2">{item.date}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm ${item.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Start your admission process today and secure your seat
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/registration" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center space-x-2">
                <span>Register Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Admission;
