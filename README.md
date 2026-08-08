<<<<<<< HEAD
# Shree Sai Computer Education - Complete Website

A professional multi-page website for Shree Sai Computer Education Institute built with React, Node.js, and MongoDB.

## Tech Stack

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion (animations)
- React Router (routing)
- Axios (API calls)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (authentication)
- Bcrypt (password hashing)
- Multer (file uploads)

## Project Structure

```
InstituteProject/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js Backend
│   ├── config/             # Database config
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── uploads/            # Uploaded files
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (free cloud database) OR local MongoDB
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InstituteProject
   ```

2. **Install dependencies**
   ```bash
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. **Environment Setup**
   
   Create `.env` file in `server/` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shree_sai_institute
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

   **Important**: For MongoDB setup, follow the detailed guide in [MONGODB_SETUP.md](./MONGODB_SETUP.md) to:
   - Create a free MongoDB Atlas account
   - Set up a cluster
   - Get your connection string
   - Configure the MONGODB_URI in your .env file

4. **Seed Database** (Optional - for sample data)
   ```bash
   cd server
   node seed.js
   ```
   This will create:
   - Admin user (email: `admin@shreesai.com`, password: `admin123`)
   - Sample courses, notifications, events, and gallery items

5. **Run the application**
   ```bash
   # Development mode (runs both client and server)
   npm run dev
   
   # Or run separately
   npm run client  # Frontend on http://localhost:5173
   npm run server  # Backend on http://localhost:5000
   ```

## Features

### Public Pages
- **Home**: Hero section, courses preview, testimonials, notifications, events
- **About**: Institute history, mission, vision, director message
- **Courses**: All courses with 3D cards (DCA, PGDCA, BCA, etc.)
- **Admission**: Admission process, documents, eligibility, fees
- **Contact**: Contact form, Google Maps integration
- **Gallery**: Classroom, lab, and event photos
- **Notifications**: Latest announcements and updates
- **Events**: Seminars, workshops, functions

### Student Portal
- **Registration**: Self-registration with validation
- **Login**: Secure authentication with JWT
- **Dashboard**: Profile, courses, attendance, fees, results, certificates

### Admin Panel
- Student management
- Course management
- Admission management
- Fee management
- Notification management
- Event management
- Gallery management
- Result management

### Special Features
- Popup registration promotion (every 5 minutes)
- 3D UI effects with glassmorphism
- Smooth animations and transitions
- Fully responsive design
- SEO optimized
- Fast loading with lazy loading

## Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository
   - Import the project
   - Configure build command: `npm run build`
   - Configure output directory: `client/dist`

### Backend Deployment (Render/Heroku)

1. **Update server/package.json**
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

2. **Deploy to Render**
   - Connect your GitHub repository
   - Create a new Web Service
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables

### MongoDB Deployment (MongoDB Atlas)

1. Create a free account on MongoDB Atlas
2. Create a new cluster
3. Get the connection string
4. Update `MONGODB_URI` in environment variables

## Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shree_sai_institute
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
```

## Database Schema

### Collections
- **users**: Students and admins
- **courses**: Course information
- **admissions**: Admission records
- **fees**: Fee payments
- **notifications**: Institute notifications
- **events**: Events and workshops
- **gallery**: Gallery images
- **results**: Student results
- **attendance**: Student attendance

## API Endpoints

### Authentication
- POST `/api/auth/register` - Student registration
- POST `/api/auth/login` - User login
- POST `/api/auth/forgot-password` - Forgot password
- GET `/api/auth/me` - Get current user

### Courses
- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get single course
- POST `/api/courses` - Create course (admin)
- PUT `/api/courses/:id` - Update course (admin)
- DELETE `/api/courses/:id` - Delete course (admin)

### Students
- GET `/api/students` - Get all students (admin)
- GET `/api/students/:id` - Get student details
- PUT `/api/students/:id` - Update student
- DELETE `/api/students/:id` - Delete student (admin)
- PUT `/api/students/:id/password` - Reset student password (admin)
- GET `/api/students/:id/dashboard` - Student dashboard

### Admissions
- POST `/api/admissions` - Submit admission
- GET `/api/admissions` - Get all admissions (admin)
- PUT `/api/admissions/:id` - Update admission status

### Notifications
- GET `/api/notifications` - Get all notifications
- POST `/api/notifications` - Create notification (admin)
- PUT `/api/notifications/:id` - Update notification (admin)
- DELETE `/api/notifications/:id` - Delete notification (admin)

### Events
- GET `/api/events` - Get all events
- POST `/api/events` - Create event (admin)
- PUT `/api/events/:id` - Update event (admin)
- DELETE `/api/events/:id` - Delete event (admin)
- POST `/api/events/:id/register` - Register for event

## Design Features

- **Color Theme**: Royal Blue (#1e40af), White (#ffffff), Light Gray (#f3f4f6)
- **3D Effects**: Glassmorphism, neumorphism, 3D card effects
- **Animations**: Smooth hover effects, page transitions
- **Typography**: Professional fonts (Inter, Poppins)
- **Icons**: Lucide React icons
- **Responsive**: Mobile-first approach

## Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation
- XSS protection
- CSRF protection
- Rate limiting
- Secure file uploads

## Performance Optimization

- Code splitting
- Lazy loading
- Image optimization
- Caching strategies
- Minification
- Gzip compression

## Database Setup

For detailed MongoDB setup instructions, please refer to [MONGODB_SETUP.md](./MONGODB_SETUP.md).

This guide covers:
- MongoDB Atlas (free cloud database) setup
- Local MongoDB installation
- Connection string configuration
- Database seeding with sample data
- Troubleshooting common issues

## Support

For support, contact:
- Email: info@shreesaicomputer.com
- Phone: +91 XXXXXXXXXX
- MongoDB Setup Guide: See [MONGODB_SETUP.md](./MONGODB_SETUP.md)

## License

Copyright © 2024 Shree Sai Computer Education. All rights reserved.
=======
# SaiComputer
make a full stack web application.
>>>>>>> ce1bbc9813a3c12f5bb2fb20dfe2860fd3dccf9b
