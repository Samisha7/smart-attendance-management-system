const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Demo data for testing without database
const demoUsers = [
    {
        _id: '1',
        name: 'Demo Teacher',
        email: 'teacher@demo.com',
        role: 'teacher',
        department: 'Computer Science'
    }
];

const demoStudents = [
    {
        _id: '1',
        studentId: 'STU001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@student.com',
        phone: '1234567890',
        department: 'Computer Science',
        semester: 3,
        rollNumber: 'CS301',
        dateOfBirth: '2000-01-01',
        address: '123 Demo Street',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '2',
        studentId: 'STU002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@student.com',
        phone: '0987654321',
        department: 'Computer Science',
        semester: 3,
        rollNumber: 'CS302',
        dateOfBirth: '2000-02-02',
        address: '456 Demo Avenue',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const demoAttendance = [
    {
        _id: '1',
        student: { _id: '1', firstName: 'John', lastName: 'Doe', studentId: 'STU001', rollNumber: 'CS301' },
        teacher: { _id: '1', name: 'Demo Teacher', email: 'teacher@demo.com' },
        date: new Date(),
        status: 'present',
        subject: 'Database Systems',
        department: 'Computer Science',
        semester: 3,
        notes: 'On time',
        markedAt: new Date()
    }
];

// Demo Routes
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Demo login - accept any email with password "demo"
    if (password === 'demo') {
        const user = demoUsers[0];
        res.json({
            message: 'Login successful',
            token: 'demo-token-' + Date.now(),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } else {
        res.status(401).json({ message: 'Invalid credentials. Use password: demo' });
    }
});

app.get('/api/auth/profile', (req, res) => {
    res.json({
        user: {
            id: demoUsers[0]._id,
            name: demoUsers[0].name,
            email: demoUsers[0].email,
            role: demoUsers[0].role,
            department: demoUsers[0].department,
            createdAt: new Date()
        }
    });
});

app.get('/api/students', (req, res) => {
    res.json({
        students: demoStudents,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalStudents: demoStudents.length,
            limit: 10
        }
    });
});

app.post('/api/students', (req, res) => {
    const newStudent = {
        _id: Date.now().toString(),
        ...req.body,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    demoStudents.push(newStudent);
    res.status(201).json({
        message: 'Student added successfully',
        student: newStudent
    });
});

app.get('/api/attendance', (req, res) => {
    res.json({
        attendance: demoAttendance,
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalRecords: demoAttendance.length,
            limit: 10
        }
    });
});

app.get('/api/dashboard/overview', (req, res) => {
    res.json({
        overview: {
            totalStudents: demoStudents.length,
            todayStats: {
                total: 10,
                present: 8,
                absent: 2,
                late: 0,
                excused: 0
            },
            weekStats: {
                total: 50,
                present: 45,
                absent: 5,
                late: 0,
                excused: 0
            },
            monthStats: {
                total: 200,
                present: 180,
                absent: 15,
                late: 3,
                excused: 2
            }
        }
    });
});

app.get('/api/dashboard/recent-activity', (req, res) => {
    res.json({
        recentAttendance: demoAttendance
    });
});

app.get('/api/dashboard/trends', (req, res) => {
    const trends = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        trends.push({
            _id: { date: date.toISOString().split('T')[0] },
            total: Math.floor(Math.random() * 20) + 10,
            present: Math.floor(Math.random() * 18) + 8,
            absent: Math.floor(Math.random() * 3) + 1,
            late: 0,
            excused: 0
        });
    }
    res.json({ trends });
});

app.get('/api/dashboard/department-stats', (req, res) => {
    res.json({
        date: new Date().toISOString().split('T')[0],
        departmentStats: [
            {
                department: 'Computer Science',
                totalStudents: 50,
                attendance: {
                    total: 45,
                    present: 42,
                    absent: 2,
                    late: 1,
                    excused: 0
                }
            }
        ]
    });
});

app.get('/api/students/departments/list', (req, res) => {
    res.json({ departments: ['Computer Science', 'Engineering', 'Business'] });
});

app.get('/api/attendance/subjects/list', (req, res) => {
    res.json({ subjects: ['Database Systems', 'Web Development', 'Data Structures'] });
});

// Serve frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Catch-all for other routes - return demo message
app.use('/api/*', (req, res) => {
    res.status(200).json({
        message: 'Demo mode - This endpoint would normally connect to MongoDB',
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Demo Server running on port ${PORT}`);
    console.log(`📱 Open browser to: http://localhost:${PORT}`);
    console.log(`🔐 Login with: teacher@demo.com / demo`);
    console.log(`💡 This is demo mode without MongoDB connection`);
});
