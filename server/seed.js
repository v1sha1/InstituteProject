const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const Notification = require('./models/Notification');
const Event = require('./models/Event');
const Gallery = require('./models/Gallery');
const User = require('./models/User');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Clear existing data
    await Course.deleteMany();
    await Notification.deleteMany();
    await Event.deleteMany();
    await Gallery.deleteMany();
    await User.deleteMany();
    console.log('Cleared existing data');

    // Seed Courses
    const courses = await Course.insertMany([
      {
        name: 'DCA (Diploma in Computer Applications)',
        code: 'DCA001',
        description: 'Comprehensive course covering computer fundamentals, MS Office, internet basics, and basic programming.',
        duration: '1 Year',
        fees: 13999,
        eligibility: '10th Pass',
        syllabus: [
          { module: 'Computer Fundamentals', topics: ['Computer Architecture', 'Operating Systems', 'Hardware & Software'] },
          { module: 'MS Office', topics: ['Word Processing', 'Spreadsheets', 'Presentations', 'Database Management'] },
          { module: 'Internet & Email', topics: ['Browsing', 'Email Management', 'Online Security'] },
          { module: 'Programming Basics', topics: ['C Programming', 'HTML Basics', 'CSS Fundamentals'] }
        ],
        careerOpportunities: ['Data Entry Operator', 'Computer Operator', 'Office Assistant', 'Junior Developer']
      },
      {
        name: 'PGDCA (Post Graduate Diploma in Computer Applications)',
        code: 'PGDCA001',
        description: 'Advanced diploma covering programming, databases, web development, and software engineering concepts.',
        duration: '1 Year',
        fees: 15999,
        eligibility: 'Graduate in any stream',
        syllabus: [
          { module: 'Programming', topics: ['C++', 'Java', 'Python', 'Data Structures'] },
          { module: 'Database Management', topics: ['SQL', 'MySQL', 'Database Design'] },
          { module: 'Web Development', topics: ['HTML5', 'CSS3', 'JavaScript', 'React Basics'] },
          { module: 'Software Engineering', topics: ['SDLC', 'Testing', 'Project Management'] }
        ],
        careerOpportunities: ['Software Developer', 'Web Developer', 'Database Administrator', 'System Analyst']
      },
      {
        name: 'BCA (Bachelor of Computer Applications)',
        code: 'BCA001',
        description: 'Undergraduate degree program covering all aspects of computer applications and software development.',
        duration: '3 Years',
        fees: 23999,
        eligibility: '12th Pass with Math/Computer Science',
        syllabus: [
          { module: 'Programming Languages', topics: ['C', 'C++', 'Java', 'Python'] },
          { module: 'Web Technologies', topics: ['HTML', 'CSS', 'JavaScript', 'PHP', 'React'] },
          { module: 'Database Systems', topics: ['MySQL', 'Oracle', 'MongoDB'] },
          { module: 'Computer Networks', topics: ['Network Fundamentals', 'Security', 'Protocols'] },
          { module: 'Software Engineering', topics: ['Design Patterns', 'Testing', 'Agile'] }
        ],
        careerOpportunities: ['Software Engineer', 'Web Developer', 'App Developer', 'IT Consultant']
      },
      {
        name: 'B.Sc Computer Science',
        code: 'BSC001',
        description: 'Bachelor degree in computer science focusing on theoretical and practical aspects of computing.',
        duration: '3 Years',
        fees: 50000,
        eligibility: '12th Science with Math/Computer Science',
        syllabus: [
          { module: 'Core Computer Science', topics: ['Data Structures', 'Algorithms', 'Operating Systems'] },
          { module: 'Programming', topics: ['C', 'Java', 'Python', 'Assembly Language'] },
          { module: 'Mathematics', topics: ['Discrete Math', 'Calculus', 'Statistics'] },
          { module: 'Advanced Topics', topics: ['Machine Learning', 'AI Basics', 'Cloud Computing'] }
        ],
        careerOpportunities: ['Software Developer', 'Data Scientist', 'System Architect', 'Research Scientist']
      },
      {
        name: 'M.Sc Computer Science',
        code: 'MSC001',
        description: 'Postgraduate program for advanced study in computer science and specialized fields.',
        duration: '2 Years',
        fees: 60000,
        eligibility: 'B.Sc Computer Science / BCA',
        syllabus: [
          { module: 'Advanced Algorithms', topics: ['Design & Analysis', 'Optimization', 'Complexity'] },
          { module: 'Machine Learning', topics: ['Supervised Learning', 'Unsupervised Learning', 'Deep Learning'] },
          { module: 'Distributed Systems', topics: ['Cloud Computing', 'Big Data', 'Parallel Processing'] },
          { module: 'Research Methods', topics: ['Thesis Work', 'Publications', 'Seminars'] }
        ],
        careerOpportunities: ['Data Scientist', 'ML Engineer', 'Research Scientist', 'Professor']
      },
      {
        name: 'MA (Master of Arts) - Computer Applications',
        code: 'MA001',
        description: 'Master degree focusing on computer applications for non-technical graduates.',
        duration: '2 Years',
        fees: 35000,
        eligibility: 'Graduate in any stream with Computer Knowledge',
        syllabus: [
          { module: 'Computer Applications', topics: ['Advanced Office Tools', 'Project Management', 'Digital Marketing'] },
          { module: 'Web Development', topics: ['HTML', 'CSS', 'JavaScript', 'CMS'] },
          { module: 'Business Applications', topics: ['Tally', 'ERP Systems', 'Accounting Software'] },
          { module: 'Soft Skills', topics: ['Communication', 'Leadership', 'Team Management'] }
        ],
        careerOpportunities: ['IT Manager', 'Business Analyst', 'Digital Marketer', 'Project Manager']
      },
      {
        name: 'ADCA (Advanced Diploma in Computer Applications)',
        code: 'ADCA001',
        description: 'Advanced diploma covering comprehensive computer applications and programming skills.',
        duration: '1 Year',
        fees: 12000,
        eligibility: '12th Pass',
        syllabus: [
          { module: 'Advanced Office', topics: ['Advanced Excel', 'Access', 'PowerPoint', 'Outlook'] },
          { module: 'Programming', topics: ['C', 'C++', 'Java Basics', 'Python Basics'] },
          { module: 'Web Design', topics: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'] },
          { module: 'Accounting', topics: ['Tally', 'GST', 'Financial Management'] }
        ],
        careerOpportunities: ['Accountant', 'Office Manager', 'Junior Developer', 'Data Analyst']
      },
      {
        name: 'Tally with GST',
        code: 'TALLY001',
        description: 'Specialized course in accounting software Tally with GST compliance.',
        duration: '3 Months',
        fees: 5000,
        eligibility: 'Basic Computer Knowledge',
        syllabus: [
          { module: 'Tally Fundamentals', topics: ['Company Creation', 'Accounting Principles', 'Inventory'] },
          { module: 'GST', topics: ['GST Registration', 'Tax Calculation', 'Returns Filing'] },
          { module: 'Advanced Tally', topics: ['Payroll', 'TDS', 'Banking'] },
          { module: 'Reporting', topics: ['Balance Sheet', 'P&L', 'Tax Reports'] }
        ],
        careerOpportunities: ['Accountant', 'Tax Consultant', 'Finance Executive', 'Auditor']
      },
      {
        name: 'Programming Courses',
        code: 'PROG001',
        description: 'Comprehensive programming course covering multiple languages and concepts.',
        duration: '6 Months',
        fees: 10000,
        eligibility: '10th Pass with Basic Computer Knowledge',
        syllabus: [
          { module: 'C Programming', topics: ['Basics', 'Arrays', 'Pointers', 'Structures'] },
          { module: 'C++', topics: ['OOP Concepts', 'Inheritance', 'Polymorphism', 'Templates'] },
          { module: 'Java', topics: ['Core Java', 'OOP', 'Collections', 'Exception Handling'] },
          { module: 'Python', topics: ['Basics', 'Data Structures', 'File Handling', 'Libraries'] }
        ],
        careerOpportunities: ['Programmer', 'Software Developer', 'Backend Developer', 'System Programmer']
      },
      {
        name: 'Web Development',
        code: 'WEB001',
        description: 'Complete web development course from basics to advanced frameworks.',
        duration: '6 Months',
        fees: 12000,
        eligibility: '12th Pass',
        syllabus: [
          { module: 'Frontend', topics: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TailwindCSS'] },
          { module: 'Backend', topics: ['Node.js', 'Express', 'REST APIs', 'Authentication'] },
          { module: 'Database', topics: ['MySQL', 'MongoDB', 'ORM'] },
          { module: 'Deployment', topics: ['Git', 'Hosting', 'CI/CD', 'Cloud'] }
        ],
        careerOpportunities: ['Frontend Developer', 'Full Stack Developer', 'Web Designer', 'Freelancer']
      },
      {
        name: 'Graphic Design',
        code: 'GRAPHIC001',
        description: 'Professional graphic design course covering industry-standard tools and techniques.',
        duration: '4 Months',
        fees: 8000,
        eligibility: '10th Pass',
        syllabus: [
          { module: 'Design Fundamentals', topics: ['Color Theory', 'Typography', 'Layout', 'Composition'] },
          { module: 'Adobe Photoshop', topics: ['Image Editing', 'Retouching', 'Effects', 'Batch Processing'] },
          { module: 'Adobe Illustrator', topics: ['Vector Graphics', 'Logo Design', 'Illustrations', 'Print Design'] },
          { module: 'CorelDRAW', topics: ['Vector Design', 'Layout', 'Typography', 'Print Preparation'] }
        ],
        careerOpportunities: ['Graphic Designer', 'UI Designer', 'Brand Designer', 'Print Designer']
      }
    ]);
    console.log(`Seeded ${courses.length} courses`);

    // Seed Notifications
    const notifications = await Notification.insertMany([
      {
        title: 'Admissions Open for 2024-25',
        message: 'Admissions are now open for the new academic session. Register early to avail discounts.',
        type: 'announcement',
        priority: 'high',
        targetAudience: 'all'
      },
      {
        title: 'New Batch Starting - Web Development',
        message: 'A new batch for Web Development course will start from July 1, 2024. Limited seats available.',
        type: 'announcement',
        priority: 'medium',
        targetAudience: 'all'
      },
      {
        title: 'Holiday Notice - Independence Day',
        message: 'The institute will remain closed on August 15, 2024 on account of Independence Day.',
        type: 'holiday',
        priority: 'medium',
        targetAudience: 'all',
        expiryDate: new Date('2024-08-16')
      },
      {
        title: 'Mid-Term Exam Schedule Released',
        message: 'Mid-term examinations for all courses will commence from July 20, 2024. Check your dashboard for detailed schedule.',
        type: 'exam',
        priority: 'high',
        targetAudience: 'students'
      }
    ]);
    console.log(`Seeded ${notifications.length} notifications`);

    // Seed Events
    const events = await Event.insertMany([
      {
        title: 'Web Development Workshop',
        description: 'Hands-on workshop on modern web development technologies including React, Node.js, and MongoDB.',
        type: 'workshop',
        date: new Date('2024-07-10'),
        time: '10:00 AM - 4:00 PM',
        venue: 'Computer Lab 1',
        registrationRequired: true,
        maxParticipants: 30
      },
      {
        title: 'Career Guidance Seminar',
        description: 'Expert session on career opportunities in IT industry and placement tips.',
        type: 'seminar',
        date: new Date('2024-07-15'),
        time: '2:00 PM - 5:00 PM',
        venue: 'Auditorium',
        registrationRequired: false
      },
      {
        title: 'Annual Tech Fest 2024',
        description: 'Annual technical festival featuring coding competitions, project exhibitions, and cultural events.',
        type: 'annual-function',
        date: new Date('2024-08-15'),
        time: '9:00 AM - 6:00 PM',
        venue: 'Institute Campus',
        registrationRequired: true,
        maxParticipants: 200
      },
      {
        title: 'Python Programming Special Class',
        description: 'Extra session on advanced Python concepts and real-world applications.',
        type: 'special-class',
        date: new Date('2024-07-20'),
        time: '11:00 AM - 1:00 PM',
        venue: 'Computer Lab 2',
        registrationRequired: false
      }
    ]);
    console.log(`Seeded ${events.length} events`);

    // Seed Gallery
    const gallery = await Gallery.insertMany([
      {
        title: 'Modern Classroom',
        description: 'Air-conditioned classroom with projector and smart board.',
        category: 'classroom',
        imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'
      },
      {
        title: 'Computer Lab',
        description: 'State-of-the-art computer lab with 50 systems.',
        category: 'lab',
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800'
      },
      {
        title: 'Web Development Workshop',
        description: 'Students participating in hands-on workshop.',
        category: 'event',
        imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800'
      },
      {
        title: 'Institute Building',
        description: 'Front view of Shree Sai Computer Education.',
        category: 'institute',
        imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
      },
      {
        title: 'Award Ceremony 2023',
        description: 'Students receiving excellence awards.',
        category: 'achievement',
        imageUrl: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=800'
      },
      {
        title: 'Practical Session',
        description: 'Students working on practical assignments.',
        category: 'classroom',
        imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
      }
    ]);
    console.log(`Seeded ${gallery.length} gallery items`);

    // Seed Important Dates
    const ImportantDate = require('./models/ImportantDate');
    await ImportantDate.deleteMany();
    const dates = await ImportantDate.insertMany([
      { event: 'Admission Start', date: 'June 1, 2026', status: 'Open', order: 1 },
      { event: 'Admission End', date: 'July 31, 2026', status: 'Upcoming', order: 2 },
      { event: 'Session Start', date: 'August 1, 2026', status: 'Upcoming', order: 3 },
      { event: 'Last Admission', date: 'August 15, 2026', status: 'Upcoming', order: 4 }
    ]);
    console.log(`Seeded ${dates.length} important dates`);

    // Seed Admin User
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@shreesai.com',
      mobile: '8823885578',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Seeded admin user');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
