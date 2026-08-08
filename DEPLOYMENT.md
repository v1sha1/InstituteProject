# Deployment Guide - Shree Sai Computer Education Website

This guide provides step-by-step instructions for deploying the Shree Sai Computer Education website to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Frontend Deployment](#frontend-deployment)
6. [Backend Deployment](#backend-deployment)
7. [Database Deployment](#database-deployment)
8. [Production Checklist](#production-checklist)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:
- Node.js (v18 or higher) installed
- MongoDB account (MongoDB Atlas recommended for production)
- Git installed
- A Vercel account (for frontend)
- A Render/Railway/Heroku account (for backend)

## Local Development Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd InstituteProject
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 3. Setup Environment Variables

Create `.env` file in the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shree_sai_institute
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 4. Seed the Database
```bash
cd server
node seed.js
```

### 5. Run the Application
```bash
# From root directory
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Database Setup

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Select "Free" tier
   - Choose a region closest to your users
   - Name your cluster (e.g., "shree-sai-cluster")
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password Authentication"
   - Enter username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (for development)
   - For production, add your backend server IP
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Choose Node.js version
   - Copy the connection string

6. **Update Environment Variables**
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shree_sai_institute?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB (Development Only)

1. **Install MongoDB**
   - Windows: Download from https://www.mongodb.com/try/download/community
   - Mac: `brew install mongodb-community`
   - Linux: Follow official documentation

2. **Start MongoDB**
   ```bash
   # Windows
   mongod

   # Mac/Linux
   sudo systemctl start mongod
   ```

## Environment Configuration

### Server Environment Variables

Create `.env` file in `server/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/shree_sai_institute?retryWrites=true&w=majority

# JWT Secret (Generate a strong random string)
JWT_SECRET=your_very_secure_jwt_secret_key_minimum_32_characters_long

# CORS (Frontend URL)
CLIENT_URL=https://your-frontend-domain.com
```

### Client Environment Variables

Create `.env` file in `client/` directory:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Frontend Deployment (Vercel)

### Step 1: Prepare for Deployment

1. **Update Vite Config**
   The `vite.config.js` is already configured for production.

2. **Build the Application**
   ```bash
   cd client
   npm run build
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd client
   vercel
   ```

4. **Follow the Prompts**
   - Set up and deploy? → Yes
   - Which scope? → Your account
   - Link to existing project? → No
   - Project name → shree-sai-frontend
   - Directory → ./ (current directory)
   - Override settings? → No

5. **Add Environment Variables**
   - Go to Vercel dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL` = your backend URL

6. **Redeploy**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: client
   - Build Command: npm run build
   - Output Directory: dist
5. Add environment variables
6. Click "Deploy"

## Backend Deployment (Render)

### Step 1: Prepare for Deployment

1. **Update server.js**
   The server is already configured for production.

2. **Update package.json**
   Ensure `server/package.json` has:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Step 2: Deploy to Render

1. **Create Render Account**
   - Go to https://render.com
   - Sign up for free account

2. **Create New Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: shree-sai-backend
     - Region: Choose closest to your users
     - Branch: main
     - Runtime: Node
     - Build Command: `cd server && npm install`
     - Start Command: `cd server && node server.js`

3. **Add Environment Variables**
   - PORT: 5000
   - MONGODB_URI: Your MongoDB connection string
   - JWT_SECRET: Your JWT secret
   - NODE_ENV: production
   - CLIENT_URL: Your Vercel frontend URL

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Alternative: Deploy via Render CLI

```bash
# Install Render CLI
npm install -g render-cli

# Login
render login

# Deploy
cd server
render init
```

## Database Deployment

### MongoDB Atlas (Already covered above)

Your MongoDB Atlas database is already production-ready. Just ensure:
- IP whitelist includes your backend server IP
- Database user has appropriate permissions
- Connection string is updated in environment variables

## Production Checklist

Before going live, ensure:

### Security
- [ ] Change default JWT secret
- [ ] Enable MongoDB IP whitelist (restrict to backend IP only)
- [ ] Use strong database password
- [ ] Enable HTTPS (automatic on Vercel/Render)
- [ ] Set NODE_ENV to production
- [ ] Remove/disable any debug logs

### Performance
- [ ] Enable gzip compression (automatic on Vercel/Render)
- [ ] Optimize images
- [ ] Enable caching headers
- [ ] Use CDN for static assets (automatic on Vercel)

### SEO
- [ ] Update meta tags in index.html
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Submit to Google Search Console

### Testing
- [ ] Test all user flows
- [ ] Test authentication
- [ ] Test file uploads
- [ ] Test API endpoints
- [ ] Test on mobile devices
- [ ] Test on different browsers

### Monitoring
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Set up uptime monitoring
- [ ] Set up database backups (MongoDB Atlas automatic)
- [ ] Set up logging

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Error
```
MongoDB Connection Error: MongooseServerSelectionError
```
**Solution:**
- Check MongoDB connection string
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions
- Check if MongoDB cluster is running

#### 2. CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:**
- Add frontend URL to CORS whitelist in server.js
- Ensure CLIENT_URL environment variable is set correctly
- Check that API URL in frontend is correct

#### 3. Build Error on Vercel
```
Error: Build failed
```
**Solution:**
- Check that all dependencies are in package.json
- Ensure Node version is compatible (v18+)
- Check build logs for specific errors
- Try local build first: `npm run build`

#### 4. Backend Not Starting on Render
```
Error: Server failed to start
```
**Solution:**
- Check start command in Render settings
- Verify all environment variables are set
- Check Render logs for specific errors
- Ensure PORT is set correctly

#### 5. JWT Token Not Working
```
Error: Not authorized, token failed
```
**Solution:**
- Ensure JWT_SECRET is set in environment variables
- Check that token is being sent in Authorization header
- Verify token hasn't expired
- Check JWT_SECRET matches between development and production

### Getting Help

If you encounter issues:
1. Check logs in Vercel/Render dashboard
2. Check MongoDB Atlas logs
3. Review this troubleshooting guide
4. Check official documentation:
   - Vercel: https://vercel.com/docs
   - Render: https://render.com/docs
   - MongoDB: https://docs.mongodb.com

## Post-Deployment

### 1. Seed Production Database
```bash
# SSH into your server or use Render shell
cd server
node seed.js
```

### 2. Create Admin Account
Use the seeded admin account:
- Email: admin@shreesai.com
- Password: admin123
- **IMPORTANT**: Change this password immediately after first login!

### 3. Configure Domain
- **Frontend**: Add custom domain in Vercel dashboard
- **Backend**: Add custom domain in Render dashboard
- Update DNS records as instructed

### 4. Set Up Monitoring
- Enable Render metrics
- Set up MongoDB Atlas monitoring
- Configure error tracking (optional)

### 5. Backup Strategy
- MongoDB Atlas provides automatic backups
- Enable point-in-time recovery if needed
- Regularly export data for local backups

## Maintenance

### Regular Tasks
- Update dependencies monthly
- Monitor database storage
- Review logs weekly
- Update security patches
- Backup before major changes

### Scaling
- If traffic increases:
  - Upgrade Render plan
  - Scale MongoDB cluster
  - Add CDN for static assets
  - Implement caching (Redis)

## Cost Estimation

### Free Tier Limits
- **Vercel**: Free for hobby projects (100GB bandwidth/month)
- **Render**: Free tier available (512MB RAM, 0.1 CPU)
- **MongoDB Atlas**: Free tier (512MB storage)

### Estimated Monthly Costs (Production)
- **Vercel Pro**: $20/month
- **Render Standard**: $7-25/month (depending on resources)
- **MongoDB Atlas Shared**: $9/month
- **Total**: ~$36-54/month

## Support

For additional support:
- Email: support@shreesaicomputer.com
- Phone: +91 98765 43210

---

**Last Updated**: June 2024
**Version**: 1.0.0
