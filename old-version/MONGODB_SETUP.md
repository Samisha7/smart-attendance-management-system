# MongoDB Setup Guide for Smart Attendance Management System

This guide will help you set up MongoDB on Windows for the Smart Attendance Management System.

## 🚀 Option 1: MongoDB Community Server (Recommended)

### Step 1: Download MongoDB
1. Go to [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Select:
   - Version: Latest stable version
   - Platform: Windows
   - Package: MSI installer
3. Click **Download**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` installer
2. Choose **Complete** installation
3. Check **Install MongoDB as a Service**
4. Check **Install MongoDB Compass** (GUI tool)
5. Click **Install** and wait for completion

### Step 3: Verify Installation
1. Open Command Prompt as Administrator
2. Run:
   ```bash
   mongod --version
   ```
3. You should see MongoDB version information

### Step 4: Start MongoDB Service
1. Open **Services** (press Win + R, type `services.msc`)
2. Find **MongoDB Server**
3. Right-click → **Start** (if not already running)
4. Set startup type to **Automatic**

## 🐳 Option 2: MongoDB with Docker (Alternative)

### Step 1: Install Docker Desktop
1. Download from [Docker Hub](https://www.docker.com/products/docker-desktop)
2. Install and start Docker Desktop

### Step 2: Run MongoDB Container
```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

### Step 3: Verify Container
```bash
docker ps
```

## 📦 Option 3: MongoDB Atlas (Cloud-based)

### Step 1: Create Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account

### Step 2: Create Cluster
1. Click **Build a Cluster**
2. Select **Free Tier (M0)**
3. Choose cloud provider and region
4. Click **Create Cluster**

### Step 3: Get Connection String
1. Go to **Database Access** → **Add User**
2. Create database user with username and password
3. Go to **Network Access** → **Add IP Address** → **Allow Access from Anywhere**
4. Go to **Clusters** → **Connect** → **Connect Your Application**
5. Copy the connection string

## ⚙️ Configuration for Your App

### Update .env File
Open `.env` file in your project and update the MongoDB URI:

#### For Local MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/smart_attendance
```

#### For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart_attendance?retryWrites=true&w=majority
```

#### For Docker:
```env
MONGODB_URI=mongodb://localhost:27017/smart_attendance
```

## 🔧 Testing the Connection

### Method 1: Using MongoDB Compass
1. Open MongoDB Compass
2. Enter connection string: `mongodb://localhost:27017`
3. Click **Connect**
4. You should see the database interface

### Method 2: Using Command Line
```bash
# Open MongoDB Shell
mongosh

# Test connection
show dbs
```

### Method 3: Using Node.js
Create a test file `test-db.js`:
```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/smart_attendance')
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  });
```

Run:
```bash
node test-db.js
```

## 🛠️ Common Issues & Solutions

### Issue 1: Service Won't Start
**Solution:**
1. Check if port 27017 is free:
   ```bash
   netstat -ano | findstr :27017
   ```
2. Kill conflicting process:
   ```bash
   taskkill /PID <PID> /F
   ```

### Issue 2: Access Denied
**Solution:**
1. Run Command Prompt as Administrator
2. Start service manually:
   ```bash
   net start MongoDB
   ```

### Issue 3: Connection Timeout
**Solution:**
1. Check Windows Firewall settings
2. Add exception for MongoDB port 27017
3. Verify MongoDB service is running

### Issue 4: Database Not Created
**Solution:**
1. The database will be created automatically when you first connect
2. Or create manually:
   ```javascript
   use smart_attendance
   db.createCollection("test")
   ```

## 📋 Verification Checklist

- [ ] MongoDB is installed and running
- [ ] Service is set to automatic startup
- [ ] Port 27017 is accessible
- [ ] `.env` file is updated with correct URI
- [ ] Test connection works
- [ ] Application can connect to database

## 🚀 Next Steps

Once MongoDB is set up:

1. **Start your application:**
   ```bash
   npm install
   npm start
   ```

2. **Access the application:**
   Open browser to `http://localhost:5000`

3. **Register first teacher:**
   - Click on registration link
   - Create teacher account
   - Start using the system

## 📞 Support Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Community Forums](https://community.mongodb.com/)
- [Stack Overflow MongoDB Tag](https://stackoverflow.com/questions/tagged/mongodb)

## 🎯 Quick Start Commands

```bash
# Install MongoDB (Windows)
# Download from: https://www.mongodb.com/try/download/community

# Start MongoDB Service
net start MongoDB

# Check MongoDB Status
sc query MongoDB

# Connect to MongoDB Shell
mongosh

# Install Node.js Dependencies
npm install

# Start Application
npm start
```

Your Smart Attendance Management System will automatically create the necessary database and collections when you first run the application!
