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

// Enhanced demo data with more departments and sequential roll numbers
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
        rollNumber: '1',
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
        rollNumber: '2',
        dateOfBirth: '2000-02-02',
        address: '456 Demo Avenue',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '3',
        studentId: 'STU003',
        firstName: 'Michael',
        lastName: 'Johnson',
        email: 'michael.johnson@student.com',
        phone: '1112223333',
        department: 'Engineering',
        semester: 3,
        rollNumber: '3',
        dateOfBirth: '2000-03-03',
        address: '789 Demo Boulevard',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '4',
        studentId: 'STU004',
        firstName: 'Emily',
        lastName: 'Williams',
        email: 'emily.williams@student.com',
        phone: '4445556666',
        department: 'Business',
        semester: 3,
        rollNumber: '4',
        dateOfBirth: '2000-04-04',
        address: '321 Demo Court',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '5',
        studentId: 'STU005',
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@student.com',
        phone: '7778889999',
        department: 'Computer Science',
        semester: 3,
        rollNumber: '5',
        dateOfBirth: '2000-05-05',
        address: '654 Demo Drive',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '6',
        studentId: 'STU006',
        firstName: 'Sarah',
        lastName: 'Davis',
        email: 'sarah.davis@student.com',
        phone: '1234567890',
        department: 'Engineering',
        semester: 3,
        rollNumber: '6',
        dateOfBirth: '2000-06-06',
        address: '987 Demo Lane',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '7',
        studentId: 'STU007',
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.miller@student.com',
        phone: '2468135790',
        department: 'Business',
        semester: 3,
        rollNumber: '7',
        dateOfBirth: '2000-07-07',
        address: '147 Demo Street',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '8',
        studentId: 'STU008',
        firstName: 'Lisa',
        lastName: 'Anderson',
        email: 'lisa.anderson@student.com',
        phone: '3692581470',
        department: 'Computer Science',
        semester: 3,
        rollNumber: '8',
        dateOfBirth: '2000-08-08',
        address: '258 Demo Avenue',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '9',
        studentId: 'STU009',
        firstName: 'James',
        lastName: 'Wilson',
        email: 'james.wilson@student.com',
        phone: '1472583690',
        department: 'Engineering',
        semester: 3,
        rollNumber: '9',
        dateOfBirth: '2000-09-09',
        address: '369 Demo Boulevard',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '10',
        studentId: 'STU010',
        firstName: 'Jennifer',
        lastName: 'Taylor',
        email: 'jennifer.taylor@student.com',
        phone: '2581470369',
        department: 'Business',
        semester: 3,
        rollNumber: '10',
        dateOfBirth: '2000-10-10',
        address: '741 Demo Court',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '11',
        studentId: 'STU011',
        firstName: 'William',
        lastName: 'Moore',
        email: 'william.moore@student.com',
        phone: '8529630741',
        department: 'Computer Science',
        semester: 3,
        rollNumber: '11',
        dateOfBirth: '2000-11-11',
        address: '852 Demo Drive',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '12',
        studentId: 'STU012',
        firstName: 'Patricia',
        lastName: 'Jackson',
        email: 'patricia.jackson@student.com',
        phone: '7418529630',
        department: 'Engineering',
        semester: 3,
        rollNumber: '12',
        dateOfBirth: '2000-12-12',
        address: '963 Demo Lane',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '13',
        studentId: 'STU013',
        firstName: 'Christopher',
        lastName: 'Martin',
        email: 'christopher.martin@student.com',
        phone: '1597534562',
        department: 'Business',
        semester: 3,
        rollNumber: '13',
        dateOfBirth: '2000-01-13',
        address: '159 Demo Street',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '14',
        studentId: 'STU014',
        firstName: 'Amanda',
        lastName: 'Thompson',
        email: 'amanda.thompson@student.com',
        phone: '3579518246',
        department: 'Computer Science',
        semester: 3,
        rollNumber: '14',
        dateOfBirth: '2000-02-14',
        address: '753 Demo Avenue',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: '15',
        studentId: 'STU015',
        firstName: 'Daniel',
        lastName: 'Garcia',
        email: 'daniel.garcia@student.com',
        phone: '6543219870',
        department: 'Engineering',
        semester: 3,
        rollNumber: '15',
        dateOfBirth: '2000-03-15',
        address: '951 Demo Boulevard',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const demoAttendance = [
    {
        _id: '1',
        student: { _id: '1', firstName: 'John', lastName: 'Doe', studentId: 'STU001', rollNumber: '1' },
        teacher: { _id: '1', name: 'Demo Teacher', email: 'teacher@demo.com' },
        date: new Date(),
        status: 'present',
        subject: 'Database Systems',
        department: 'Computer Science',
        semester: 3,
        notes: 'On time',
        markedAt: new Date()
    },
    {
        _id: '2',
        student: { _id: '2', firstName: 'Jane', lastName: 'Smith', studentId: 'STU002', rollNumber: '2' },
        teacher: { _id: '1', name: 'Demo Teacher', email: 'teacher@demo.com' },
        date: new Date(),
        status: 'present',
        subject: 'Web Development',
        department: 'Computer Science',
        semester: 3,
        notes: 'Active participation',
        markedAt: new Date()
    },
    {
        _id: '3',
        student: { _id: '3', firstName: 'Michael', lastName: 'Johnson', studentId: 'STU003', rollNumber: '3' },
        teacher: { _id: '1', name: 'Demo Teacher', email: 'teacher@demo.com' },
        date: new Date(),
        status: 'late',
        subject: 'Data Structures',
        department: 'Engineering',
        semester: 3,
        notes: 'Arrived 10 minutes late',
        markedAt: new Date()
    }
];

// Enhanced routes
app.get('/api/students/departments/list', (req, res) => {
    res.json({ 
        departments: ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Arts', 'Science', 'Mathematics', 'Physics', 'Chemistry'] 
    });
});

app.get('/api/attendance/subjects/list', (req, res) => {
    res.json({ 
        subjects: ['Database Systems', 'Web Development', 'Data Structures', 'Algorithms', 'Machine Learning', 
                   'Software Engineering', 'Computer Networks', 'Operating Systems', 'Artificial Intelligence'] 
    });
});

// Serve enhanced frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Demo routes
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
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
                total: 15,
                present: 12,
                absent: 3,
                late: 0,
                excused: 0
            },
            weekStats: {
                total: 75,
                present: 68,
                absent: 7,
                late: 0,
                excused: 0
            },
            monthStats: {
                total: 300,
                present: 267,
                absent: 25,
                late: 5,
                excused: 3
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
                totalStudents: 8,
                attendance: {
                    total: 45,
                    present: 42,
                    absent: 2,
                    late: 1,
                    excused: 0
                }
            },
            {
                department: 'Engineering',
                totalStudents: 4,
                attendance: {
                    total: 30,
                    present: 26,
                    absent: 3,
                    late: 1,
                    excused: 0
                }
            },
            {
                department: 'Business',
                totalStudents: 3,
                attendance: {
                    total: 15,
                    present: 14,
                    absent: 1,
                    late: 0,
                    excused: 0
                }
            }
        ]
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Enhanced Server running on port ${PORT}`);
    console.log(`📱 Open browser to: http://localhost:${PORT}`);
    console.log(`🔐 Login with: teacher@demo.com / demo`);
    console.log(`✨ Enhanced UI with 15 students and multiple departments`);
    console.log(`🎨 Features: Modern gradients, animations, and responsive design`);
});
