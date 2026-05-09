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

// Enhanced index.html with inline styles
const enhancedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Attendance Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #6366f1;
            --secondary-color: #6c757d;
            --success-color: #10b981;
            --danger-color: #ef4444;
            --warning-color: #f59e0b;
            --info-color: #3b82f6;
            --light-color: #f8fafc;
            --dark-color: #1e293b;
            --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --gradient-success: linear-gradient(135deg, #10b981 0%, #059669 100%);
            --gradient-danger: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            --gradient-info: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            pointer-events: none;
            z-index: -1;
        }

        .navbar {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .navbar-brand {
            font-weight: 700;
            font-size: 1.25rem;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .card {
            border: none;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            overflow: hidden;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.15);
        }

        .stats-card {
            border-left: 4px solid;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .stats-number {
            font-size: 2.5rem;
            font-weight: 800;
            line-height: 1;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .btn {
            font-weight: 600;
            border-radius: 0.75rem;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: var(--gradient-primary);
            border: none;
            color: white;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .status-badge {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
            border-radius: 2rem;
            font-weight: 700;
        }

        .status-present { background: var(--gradient-success); color: white; }
        .status-absent { background: var(--gradient-danger); color: white; }
        .status-late { background: var(--gradient-warning); color: white; }
        .status-excused { background: var(--gradient-info); color: white; }

        .table th {
            font-weight: 700;
            color: var(--dark-color);
            border-top: none;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            padding: 1rem;
            text-transform: uppercase;
            font-size: 0.875rem;
            letter-spacing: 0.5px;
        }

        .table-hover tbody tr:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
            transform: scale(1.01);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .fade-in { animation: fadeIn 0.5s ease-out; }
    </style>
</head>
<body>
    <div id="app">
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <i class="bi bi-mortarboard-fill me-2"></i>
                    Smart Attendance
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" data-page="dashboard">
                                <i class="bi bi-speedometer2 me-1"></i>Dashboard
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-page="students">
                                <i class="bi bi-people me-1"></i>Students
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-page="attendance">
                                <i class="bi bi-check-square me-1"></i>Attendance
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#" data-page="reports">
                                <i class="bi bi-graph-up me-1"></i>Reports
                            </a>
                        </li>
                    </ul>
                    <div class="navbar-nav">
                        <div class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                                <i class="bi bi-person-circle me-1"></i>
                                <span id="userName">User</span>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" data-page="profile">
                                    <i class="bi bi-person me-2"></i>Profile
                                </a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item" href="#" id="logoutBtn">
                                    <i class="bi bi-box-arrow-right me-2"></i>Logout
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Login Page -->
        <div id="loginPage" class="d-none">
            <div class="container-fluid vh-100 d-flex align-items-center justify-content-center">
                <div class="card shadow-lg" style="width: 400px;">
                    <div class="card-body p-5 fade-in">
                        <div class="text-center mb-4">
                            <i class="bi bi-mortarboard-fill text-primary" style="font-size: 3rem;"></i>
                            <h3 class="mt-3">Smart Attendance</h3>
                            <p class="text-muted">Management System</p>
                        </div>
                        <form id="loginForm">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" required>
                            </div>
                            <div class="mb-3 form-check">
                                <input type="checkbox" class="form-check-input" id="rememberMe">
                                <label class="form-check-label" for="rememberMe">Remember me</label>
                            </div>
                            <button type="submit" class="btn btn-primary w-100">
                                <i class="bi bi-box-arrow-in-right me-2"></i>Login
                            </button>
                        </form>
                        <div class="text-center mt-3">
                            <small class="text-muted">
                                Don't have an account? 
                                <a href="#" id="showRegisterBtn">Register here</a>
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div id="mainContent" class="container-fluid py-4">
            <!-- Dashboard Page -->
            <div id="dashboardPage" class="page-content">
                <div class="row mb-4">
                    <div class="col-12">
                        <h2><i class="bi bi-speedometer2 me-2"></i>Dashboard</h2>
                        <p class="text-muted">Overview of attendance statistics and recent activity</p>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="row mb-4" id="dashboardStats">
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card primary fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Total Students</h6>
                                        <div class="stats-number">15</div>
                                    </div>
                                    <div class="text-primary">
                                        <i class="bi bi-people" style="font-size: 2rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card success fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Today's Present</h6>
                                        <div class="stats-number">12</div>
                                    </div>
                                    <div class="text-success">
                                        <i class="bi bi-check-circle" style="font-size: 2rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card warning fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Today's Absent</h6>
                                        <div class="stats-number">3</div>
                                    </div>
                                    <div class="text-warning">
                                        <i class="bi bi-x-circle" style="font-size: 2rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card info fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Monthly Attendance</h6>
                                        <div class="stats-number">89%</div>
                                    </div>
                                    <div class="text-info">
                                        <i class="bi bi-graph-up" style="font-size: 2rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="row">
                    <div class="col-12">
                        <div class="card fade-in">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="card-title mb-0">Recent Activity</h5>
                                <button class="btn btn-sm btn-outline-primary" id="refreshActivityBtn">
                                    <i class="bi bi-arrow-clockwise me-1"></i>Refresh
                                </button>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table table-hover" id="recentActivityTable">
                                        <thead>
                                            <tr>
                                                <th>Student</th>
                                                <th>Subject</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                                <th>Marked By</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="fade-in">
                                                <td>John Doe</td>
                                                <td>Database Systems</td>
                                                <td><span class="badge status-badge status-present">Present</span></td>
                                                <td>${new Date().toLocaleDateString()}</td>
                                                <td>Demo Teacher</td>
                                            </tr>
                                            <tr class="fade-in">
                                                <td>Jane Smith</td>
                                                <td>Web Development</td>
                                                <td><span class="badge status-badge status-present">Present</span></td>
                                                <td>${new Date().toLocaleDateString()}</td>
                                                <td>Demo Teacher</td>
                                            </tr>
                                            <tr class="fade-in">
                                                <td>Michael Johnson</td>
                                                <td>Data Structures</td>
                                                <td><span class="badge status-badge status-late">Late</span></td>
                                                <td>${new Date().toLocaleDateString()}</td>
                                                <td>Demo Teacher</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Students Page -->
            <div id="studentsPage" class="page-content d-none">
                <div class="row mb-4">
                    <div class="col-md-8">
                        <h2><i class="bi bi-people me-2"></i>Student Management</h2>
                        <p class="text-muted">Register and manage student records</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addStudentModal">
                            <i class="bi bi-plus-circle me-2"></i>Add Student
                        </button>
                    </div>
                </div>

                <!-- Search and Filter -->
                <div class="card mb-4 fade-in">
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="studentSearch" placeholder="Search students...">
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="departmentFilter">
                                    <option value="">All Departments</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Business">Business</option>
                                    <option value="Medicine">Medicine</option>
                                    <option value="Arts">Arts</option>
                                    <option value="Science">Science</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="semesterFilter">
                                    <option value="">All Semesters</option>
                                    <option value="1">Semester 1</option>
                                    <option value="2">Semester 2</option>
                                    <option value="3">Semester 3</option>
                                    <option value="4">Semester 4</option>
                                    <option value="5">Semester 5</option>
                                    <option value="6">Semester 6</option>
                                    <option value="7">Semester 7</option>
                                    <option value="8">Semester 8</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="sortBy">
                                    <option value="createdAt">Created Date</option>
                                    <option value="firstName">First Name</option>
                                    <option value="lastName">Last Name</option>
                                    <option value="rollNumber">Roll Number</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-outline-secondary w-100" id="filterStudentsBtn">
                                    <i class="bi bi-funnel me-1"></i>Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Students Table -->
                <div class="card fade-in">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover" id="studentsTable">
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
                                        <th>Student ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Semester</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="studentsTableBody">
                                    <!-- Students will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        class AttendanceApp {
            constructor() {
                this.apiBase = '/api';
                this.token = localStorage.getItem('token');
                this.currentUser = null;
                this.currentPage = 'dashboard';
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.checkAuth();
                this.loadStudentsTable();
            }

            setupEventListeners() {
                // Navigation
                document.querySelectorAll('.nav-link[data-page]').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const page = e.target.closest('.nav-link').dataset.page;
                        this.navigateToPage(page);
                    });
                });

                // Login form
                document.getElementById('loginForm')?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.login();
                });

                // Logout button
                document.getElementById('logoutBtn')?.addEventListener('click', () => {
                    this.logout();
                });

                // Filter students
                document.getElementById('filterStudentsBtn')?.addEventListener('click', () => {
                    this.loadStudentsTable();
                });

                // Search students
                document.getElementById('studentSearch')?.addEventListener('input', () => {
                    this.loadStudentsTable();
                });
            }

            checkAuth() {
                if (this.token) {
                    this.currentUser = demoUsers[0];
                    this.showMainContent();
                    this.navigateToPage('dashboard');
                } else {
                    this.showLogin();
                }
            }

            login() {
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                if (password === 'demo') {
                    this.token = 'demo-token-' + Date.now();
                    localStorage.setItem('token', this.token);
                    this.currentUser = demoUsers[0];
                    this.showMainContent();
                    this.navigateToPage('dashboard');
                    this.showToast('Login successful!', 'success');
                } else {
                    this.showToast('Invalid credentials. Use password: demo', 'danger');
                }
            }

            logout() {
                this.token = null;
                this.currentUser = null;
                localStorage.removeItem('token');
                this.showLogin();
                this.showToast('Logged out successfully', 'info');
            }

            showLogin() {
                document.getElementById('loginPage').classList.remove('d-none');
                document.getElementById('mainContent').classList.add('d-none');
                document.querySelector('.navbar').classList.add('d-none');
            }

            showMainContent() {
                document.getElementById('loginPage').classList.add('d-none');
                document.getElementById('mainContent').classList.remove('d-none');
                document.querySelector('.navbar').classList.remove('d-none');
                
                // Update user info in navbar
                document.getElementById('userName').textContent = this.currentUser.name;
            }

            navigateToPage(page) {
                // Hide all pages
                document.querySelectorAll('.page-content').forEach(p => {
                    p.classList.add('d-none');
                });

                // Show selected page
                document.getElementById(\`\${page}Page\`)?.classList.remove('d-none');

                // Update navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(\`.nav-link[data-page="\${page}"]\`)?.classList.add('active');

                this.currentPage = page;
            }

            loadStudentsTable() {
                const tbody = document.getElementById('studentsTableBody');
                const search = document.getElementById('studentSearch')?.value || '';
                const department = document.getElementById('departmentFilter')?.value || '';

                const filteredStudents = demoStudents.filter(student => {
                    const matchesSearch = !search || 
                        student.firstName.toLowerCase().includes(search.toLowerCase()) ||
                        student.lastName.toLowerCase().includes(search.toLowerCase()) ||
                        student.studentId.toLowerCase().includes(search.toLowerCase()) ||
                        student.rollNumber.includes(search);
                    
                    const matchesDepartment = !department || student.department === department;
                    
                    return matchesSearch && matchesDepartment;
                });

                tbody.innerHTML = filteredStudents.map(student => `
                    <tr class="fade-in">
                        <td>${student.rollNumber}</td>
                        <td>${student.studentId}</td>
                        <td>${student.firstName} ${student.lastName}</td>
                        <td>${student.email}</td>
                        <td>${student.department}</td>
                        <td>${student.semester}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" onclick="app.editStudent('${student._id}')">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="app.deleteStudent('${student._id}')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `).join('');
            }

            showToast(message, type = 'info') {
                const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
                
                const toastId = 'toast-' + Date.now();
                const toastHtml = `
                    <div id="${toastId}" class="toast" role="alert">
                        <div class="toast-header">
                            <strong class="me-auto">Notification</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                        </div>
                        <div class="toast-body">
                            <div class="alert alert-${type} mb-0">${message}</div>
                        </div>
                    </div>
                `;
                
                toastContainer.insertAdjacentHTML('beforeend', toastHtml);
                
                const toastElement = document.getElementById(toastId);
                const toast = new bootstrap.Toast(toastElement);
                toast.show();
                
                toastElement.addEventListener('hidden.bs.toast', () => {
                    toastElement.remove();
                });
            }

            createToastContainer() {
                const container = document.createElement('div');
                container.className = 'toast-container';
                container.style.cssText = 'position: fixed; top: 1rem; right: 1rem; z-index: 1050;';
                document.body.appendChild(container);
                return container;
            }

            editStudent(studentId) {
                this.showToast('Edit functionality would be implemented here', 'info');
            }

            deleteStudent(studentId) {
                if (confirm('Are you sure you want to delete this student?')) {
                    const index = demoStudents.findIndex(s => s._id === studentId);
                    if (index > -1) {
                        demoStudents.splice(index, 1);
                        this.loadStudentsTable();
                        this.showToast('Student deleted successfully', 'success');
                    }
                }
            }
        }

        const app = new AttendanceApp();
    </script>
</body>
</html>
`;

// Enhanced routes with more departments
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
app.get('/', (req, res) => res.send(enhancedHTML));

// Demo routes (same as before)
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(\`🚀 Enhanced Server running on port \${PORT}\`);
    console.log(\`📱 Open browser to: http://localhost:\${PORT}\`);
    console.log(\`🔐 Login with: teacher@demo.com / demo\`);
    console.log(\`✨ Enhanced UI with 15 students and multiple departments\`);
    console.log(\`🎨 Features: Modern gradients, animations, and responsive design\`);
});
