# Smart Attendance Management System

A comprehensive digital attendance management system designed for teachers to efficiently track and manage student attendance with advanced analytics and reporting capabilities.

## 🚀 Features

### Core Functionality
- **Student Registration**: Register and manage student profiles with detailed information
- **Attendance Marking**: Mark attendance for multiple students simultaneously
- **Attendance Reports**: Generate comprehensive reports with various filters
- **Search & Filter**: Advanced search and filtering capabilities for students and records
- **Dashboard Statistics**: Real-time analytics and overview of attendance trends

### Advanced Features
- **Authentication**: Secure login system for teachers and administrators
- **MongoDB Integration**: Robust database relationships and data management
- **Responsive UI**: Modern, mobile-friendly interface built with Bootstrap
- **Real-time Charts**: Interactive charts and visualizations using Chart.js
- **Export Reports**: Generate and download attendance reports
- **Department-wise Management**: Organize students by departments and semesters

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Markup structure
- **CSS3** - Styling with custom CSS
- **JavaScript (ES6+)** - Client-side functionality
- **Bootstrap 5** - UI framework
- **Chart.js** - Data visualization
- **Bootstrap Icons** - Icon library

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-attendance-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env` file and update the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart_attendance
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```

4. **Start MongoDB**
   - Ensure MongoDB is running on your system
   - Default connection: `mongodb://localhost:27017/smart_attendance`

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Open your browser and navigate to: `http://localhost:5000`

## 📁 Project Structure

```
smart-attendance-management/
├── models/                 # Database models
│   ├── User.js            # User/Teacher model
│   ├── Student.js         # Student model
│   └── Attendance.js      # Attendance record model
├── routes/                # API routes
│   ├── auth.js            # Authentication routes
│   ├── students.js        # Student management routes
│   ├── attendance.js      # Attendance routes
│   ├── reports.js         # Reports routes
│   └── dashboard.js       # Dashboard routes
├── middleware/            # Custom middleware
│   └── auth.js            # Authentication middleware
├── public/                # Frontend assets
│   ├── css/
│   │   └── style.css      # Custom styles
│   ├── js/
│   │   └── app.js         # Frontend JavaScript
│   └── index.html         # Main HTML file
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── server.js              # Main server file
└── README.md              # Documentation
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Students
- `GET /api/students` - Get all students with filters
- `POST /api/students` - Add new student
- `GET /api/students/:id` - Get student by ID
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/departments/list` - Get departments list

### Attendance
- `POST /api/attendance/mark` - Mark attendance for students
- `GET /api/attendance` - Get attendance records with filters
- `GET /api/attendance/student/:studentId` - Get student attendance
- `PUT /api/attendance/:id` - Update attendance record
- `DELETE /api/attendance/:id` - Delete attendance record
- `GET /api/attendance/subjects/list` - Get subjects list

### Reports
- `GET /api/reports/statistics` - Get attendance statistics
- `GET /api/reports/student/:studentId` - Get student report
- `GET /api/reports/class` - Get class attendance report
- `GET /api/reports/daily` - Get daily attendance report
- `GET /api/reports/trends` - Get attendance trends

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard overview
- `GET /api/dashboard/recent-activity` - Get recent activity
- `GET /api/dashboard/department-stats` - Get department statistics
- `GET /api/dashboard/performance` - Get performance metrics
- `GET /api/dashboard/trends` - Get dashboard trends

## 🎯 Usage Guide

### 1. Teacher Registration/Login
- Teachers can register with their email, password, and department
- Login to access the dashboard and features

### 2. Student Management
- Add new students with complete profile information
- Edit or delete existing student records
- Search and filter students by various criteria

### 3. Marking Attendance
- Select date, subject, department, and semester
- Load students for the selected class
- Mark attendance as Present, Absent, Late, or Excused
- Add optional notes for each student

### 4. Viewing Reports
- Generate various types of reports
- Filter by date range, department, semester
- View statistics and trends
- Export data for further analysis

### 5. Dashboard Analytics
- View real-time attendance statistics
- Monitor department-wise performance
- Track attendance trends over time
- Identify top and low performers

## 🔐 Authentication

The system uses JWT (JSON Web Tokens) for authentication:
- Tokens are valid for 24 hours
- Protected routes require valid JWT in Authorization header
- Role-based access control for teachers and administrators

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (teacher/admin),
  department: String,
  createdAt: Date
}
```

### Student Model
```javascript
{
  studentId: String (unique),
  firstName: String,
  lastName: String,
  email: String (unique),
  phone: String,
  department: String,
  semester: Number (1-8),
  rollNumber: String,
  dateOfBirth: Date,
  address: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance Model
```javascript
{
  student: ObjectId (ref: Student),
  teacher: ObjectId (ref: User),
  date: Date,
  status: String (present/absent/late/excused),
  subject: String,
  department: String,
  semester: Number,
  notes: String,
  markedAt: Date
}
```

## 🎨 UI Features

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts for different screen sizes
- Touch-friendly controls

### Interactive Elements
- Real-time form validation
- Dynamic data loading
- Interactive charts and graphs
- Modal dialogs for forms

### User Experience
- Intuitive navigation
- Search and filter capabilities
- Pagination for large datasets
- Toast notifications for user feedback

## 🔧 Development

### Running in Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic restarts on file changes.

### Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production` in environment
2. Use a production MongoDB instance
3. Configure reverse proxy (nginx/Apache)
4. Set up SSL certificates
5. Configure process manager (PM2)

### Docker Deployment
```dockerfile
# Dockerfile example
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT_SECRET configuration
   - Verify token expiration

3. **Frontend Not Loading**
   - Check static file serving configuration
   - Verify file paths in server.js
   - Check browser console for errors

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

## 🔄 Updates

### Version 1.0.0
- Initial release with core features
- Student management
- Attendance tracking
- Basic reporting
- Authentication system

### Planned Features
- Email notifications
- Advanced analytics
- Mobile app
- Integration with learning management systems
- Biometric attendance integration
