import { FileText, CheckCircle, AlertCircle, Users, Award, Scale } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-16 h-16 text-blue-200" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-blue-200 mt-4">Last Updated: January 2026</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                Acceptance of Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Shree Sai Computer Education's website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            {/* Services Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-6 h-6 text-blue-600 mr-3" />
                Our Services
              </h2>
              <p className="text-gray-600 mb-4">Shree Sai Computer Education provides the following services:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Computer education courses (DCA, PGDCA, BCA, etc.)</li>
                <li>Programming and web development training</li>
                <li>Tally and accounting software training</li>
                <li>Event organization and workshops</li>
                <li>Student admission and result management</li>
                <li>Gallery and achievement showcases</li>
              </ul>
            </div>

            {/* User Responsibilities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                User Responsibilities
              </h2>
              <p className="text-gray-600 mb-4">As a user of our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Attend classes regularly and complete assignments on time</li>
                <li>Respect faculty, staff, and fellow students</li>
                <li>Follow institute rules and regulations</li>
                <li>Pay all fees and charges on time</li>
                <li>Not engage in any fraudulent or unethical activities</li>
              </ul>
            </div>

            {/* Fee Structure */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Scale className="w-6 h-6 text-blue-600 mr-3" />
                Fee Structure and Payments
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>Course fees are as displayed on our website and are subject to change.</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>All fees must be paid before or on the due date</li>
                  <li>Fee once paid is non-refundable except in special circumstances</li>
                  <li>Installment options are available for selected courses</li>
                  <li>Late payment may attract additional charges</li>
                  <li>Fee receipts will be provided for all payments</li>
                </ul>
              </div>
            </div>

            {/* Academic Integrity */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
                Academic Integrity
              </h2>
              <p className="text-gray-600 mb-4">We maintain strict academic standards. Students must:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Complete all assignments and projects honestly</li>
                <li>Not engage in plagiarism or cheating during exams</li>
                <li>Use institute resources responsibly</li>
                <li>Maintain proper attendance as per course requirements</li>
                <li>Follow examination rules and regulations</li>
              </ul>
              <p className="text-gray-600 mt-4">
                Violation of academic integrity may result in disciplinary action, including course termination.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                Shree Sai Computer Education shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. We are not responsible for any loss of data, business interruption, or any other damages resulting from the use or inability to use our services.
              </p>
            </div>

            {/* Termination */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for any reason, including but not limited to violation of these Terms of Service. Upon termination, your right to use the services will immediately cease.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> info@shreesaicomputer.com</p>
                <p><strong>Phone:</strong> +91 9340099523</p>
                <p><strong>Address:</strong> Shree Sai Computer Education, Bhaiyathan Road Surajpur, Infront of Shyam Bhandar, Chhattisgarh - 497229</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
