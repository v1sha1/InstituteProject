# MongoDB Atlas Setup Guide

इस guide में आप सीखेंगे कि कैसे MongoDB Atlas (free cloud database) को setup करें और अपने project में connect करें।

## Step 1: MongoDB Atlas Account बनाएं

1. Browser में [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) जाएं
2. "Try Free" button पर click करें
3. अपना email, password, और details भरकर account बनाएं
4. Email verification करें

## Step 2: New Cluster बनाएं

1. Login करने के बाद "Build a Database" button पर click करें
2. **Cluster Type** में "M0 Sandbox" (Free) select करें
3. **Cloud Provider** में "AWS" या "Google Cloud" select करें
4. **Region** में "Mumbai" या अपने करीब का region select करें
5. Cluster name दें (जैसे: `shree-sai-cluster`)
6. "Create" button पर click करें
7. Cluster बनने में 2-3 minutes लग सकते हैं

## Step 3: Database User बनाएं

1. Cluster बनने के बाद "Database Access" tab पर जाएं
2. "Add New Database User" button पर click करें
3. **Authentication Method** में "Password" select करें
4. **Username** दें (जैसे: `admin`)
5. **Password** दें (strong password याद रखें)
6. **Database User Privileges** में "Read and write to any database" select करें
7. "Add User" button पर click करें

## Step 4: Network Access Setup करें

1. "Network Access" tab पर जाएं
2. "Add IP Address" button पर click करें
3. **Access from Anywhere** select करें (या अपना IP add करें)
4. "Confirm" button पर click करें

## Step 5: Connection String प्राप्त करें

1. "Database" tab पर जाएं
2. अपने cluster के नाम पर click करें
3. "Connect" button पर click करें
4. "Connect your application" select करें
5. **Driver** में "Node.js" select करें
6. **Version** में "4.1 or later" select करें
7. Connection string copy करें (यह ऐसा दिखेगा):
   ```
   mongodb+srv://admin:<password>@shree-sai-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Project में Connection String Configure करें

1. `server/.env` file खोलें
2. `MONGODB_URI` को update करें:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@shree-sai-cluster.xxxxx.mongodb.net/shree_sai_institute?retryWrites=true&w=majority
   ```
   - `<password>` को अपने actual password से replace करें
   - Database name `shree_sai_institute` या जो भी आप चाहें दे सकते हैं

## Step 7: Server Restart करें

1. Terminal में server folder में जाएं:
   ```bash
   cd server
   ```

2. Server start करें:
   ```bash
   npm run dev
   ```

3. Console में "MongoDB Connected" message दिखना चाहिए

## Step 8: Database Seed करें (Sample Data)

1. Server running रखते हुए नया terminal खोलें
2. Server folder में जाएं:
   ```bash
   cd server
   ```

3. Seed command run करें:
   ```bash
   node seed.js
   ```

4. यह command निम्नलिखित data बनाएगा:
   - Admin user (email: `admin@shreesai.com`, password: `admin123`)
   - Sample courses
   - Sample notifications
   - Sample events
   - Sample gallery items

## Step 9: Testing करें

### Admin Login Test:
1. Browser में `http://localhost:5173/login` जाएं
2. Email: `admin@shreesai.com`
3. Password: `admin123`
4. Login करें और admin panel access करें

### Student Registration Test:
1. `http://localhost:5173/registration` जाएं
2. New student register करें
3. Login करें और dashboard access करें

## Troubleshooting

### Connection Error:
- **Error**: "MongoDB Connection Error"
- **Solution**: 
  - Connection string check करें
  - Password सही है या verify करें
  - Network Access में IP allow है या check करें
  - Cluster active है या check करें

### Authentication Error:
- **Error**: "Authentication failed"
- **Solution**: 
  - Database user का password check करें
  - Username और password सही है या verify करें

### Timeout Error:
- **Error**: "Server selection timed out"
- **Solution**: 
  - Internet connection check करें
  - Firewall settings check करें
  - Network Access में IP allow है या check करें

## Important Notes

- MongoDB Atlas free tier में 512MB storage मिलता है
- Production के लिए paid tier use करें
- Password को `.env` file में ही रखें, इसे commit न करें
- Regular backups लें (Atlas में automatic backup होता है)
- Security के लिए strong password use करें

## Local MongoDB Alternative

अगर आप cloud database use नहीं करना चाहते, तो local MongoDB install करें:

### Windows:
1. [MongoDB Community Server](https://www.mongodb.com/try/download/community) download करें
2. Install करें
3. `.env` file में:
   ```
   MONGODB_URI=mongodb://localhost:27017/shree_sai_institute
   ```

### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux:
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

## Support

अगर कोई problem आए तो:
1. MongoDB Atlas documentation: https://docs.atlas.mongodb.com
2. Node.js MongoDB driver: https://mongodb.github.io/node-mongodb-native
3. Project issues check करें
