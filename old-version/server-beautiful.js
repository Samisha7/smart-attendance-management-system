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

// Enhanced demo data
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

// Enhanced attendance data for all 15 students
const demoAttendance = demoStudents.map((student, index) => ({
    _id: (index + 1).toString(),
    student: { 
        _id: student._id, 
        firstName: student.firstName, 
        lastName: student.lastName, 
        studentId: student.studentId, 
        rollNumber: student.rollNumber 
    },
    teacher: { _id: '1', name: 'Demo Teacher', email: 'teacher@demo.com' },
    date: new Date(),
    status: index < 12 ? 'present' : 'absent', // 12 present, 3 absent
    subject: 'Database Systems',
    department: student.department,
    semester: student.semester,
    notes: index < 12 ? 'On time' : 'Absent',
    markedAt: new Date()
}));

// Beautiful HTML with enhanced styling
const beautifulHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Attendance Management System</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            --danger-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
            --card-shadow: 0 20px 40px rgba(0,0,0,0.1);
            --hover-shadow: 0 30px 60px rgba(0,0,0,0.15);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            position: relative;
            overflow-x: hidden;
        }

        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
            pointer-events: none;
            z-index: 1;
        }

        .navbar {
            background: rgba(255, 255, 255, 0.95) !important;
            backdrop-filter: blur(20px);
            border: none;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            position: relative;
            z-index: 1000;
        }

        .navbar-brand {
            font-weight: 800;
            font-size: 1.5rem;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: flex;
            align-items: center;
        }

        .nav-link {
            font-weight: 600;
            color: #333 !important;
            margin: 0 0.5rem;
            padding: 0.5rem 1rem !important;
            border-radius: 50px;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-link:hover {
            background: rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        .nav-link.active {
            background: var(--primary-gradient);
            color: white !important;
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .card {
            border: none;
            border-radius: 20px;
            box-shadow: var(--card-shadow);
            transition: all 0.4s ease;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            overflow: hidden;
            position: relative;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--primary-gradient);
        }

        .card:hover {
            transform: translateY(-10px);
            box-shadow: var(--hover-shadow);
        }

        .stats-card {
            position: relative;
            overflow: hidden;
        }

        .stats-card::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transform: rotate(45deg);
            transition: all 0.6s ease;
        }

        .stats-card:hover::after {
            animation: shimmer 1s ease-in-out;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .stats-number {
            font-size: 3rem;
            font-weight: 800;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
        }

        .btn {
            font-weight: 600;
            border-radius: 50px;
            padding: 0.75rem 2rem;
            border: none;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .btn-primary {
            background: var(--primary-gradient);
            color: white;
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .btn-success {
            background: var(--success-gradient);
            color: white;
            box-shadow: 0 10px 20px rgba(79, 172, 254, 0.3);
        }

        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        .form-control, .form-select {
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            padding: 0.75rem 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
        }

        .form-control:focus, .form-select:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
            transform: translateY(-2px);
        }

        .table {
            border-radius: 15px;
            overflow: hidden;
        }

        .table th {
            background: var(--primary-gradient);
            color: white;
            border: none;
            padding: 1rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 0.85rem;
        }

        .table td {
            padding: 1rem;
            vertical-align: middle;
            border-bottom: 1px solid #f0f0f0;
        }

        .table-hover tbody tr:hover {
            background: rgba(102, 126, 234, 0.05);
            transform: scale(1.01);
        }

        .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
        }

        .status-present {
            background: var(--success-gradient);
            color: white;
            box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
        }

        .status-absent {
            background: var(--danger-gradient);
            color: white;
            box-shadow: 0 5px 15px rgba(250, 112, 154, 0.3);
        }

        .modal-content {
            border: none;
            border-radius: 25px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.2);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
        }

        .modal-header {
            background: var(--primary-gradient);
            color: white;
            border: none;
            border-radius: 25px 25px 0 0;
        }

        .modal-title {
            font-weight: 700;
        }

        .fade-in {
            animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .login-card {
            max-width: 450px;
            margin: 0 auto;
            animation: slideInUp 0.8s ease-out;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .toast-container {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1050;
        }

        .toast {
            border: none;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            backdrop-filter: blur(20px);
        }

        .page-title {
            font-weight: 800;
            background: var(--primary-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 2.5rem;
            margin-bottom: 1rem;
        }

        .section-title {
            font-weight: 700;
            color: #333;
            margin-bottom: 2rem;
            position: relative;
            padding-left: 1rem;
        }

        .section-title::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 100%;
            background: var(--primary-gradient);
            border-radius: 2px;
        }

        .attendance-status-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
        }

        .attendance-status-group .form-check {
            flex: 1;
            text-align: center;
        }

        .attendance-status-group .form-check-input {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .attendance-status-group .form-check-input:checked {
            background-color: #4facfe;
            border-color: #4facfe;
        }

        .attendance-status-group .form-check-input[value="absent"]:checked {
            background-color: #fa709a;
            border-color: #fa709a;
        }

        .search-box {
            position: relative;
        }

        .search-box::before {
            content: '\\f52a';
            font-family: 'Bootstrap Icons';
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: #667eea;
        }

        .search-box .form-control {
            padding-left: 3rem;
        }

        .card-header {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border-bottom: 2px solid rgba(102, 126, 234, 0.2);
            font-weight: 700;
            color: #333;
        }

        @media (max-width: 768px) {
            .stats-number {
                font-size: 2rem;
            }
            .page-title {
                font-size: 2rem;
            }
            .table {
                font-size: 0.9rem;
            }
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- Navigation -->
        <nav class="navbar navbar-expand-lg navbar-light">
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
                <div class="login-card">
                    <div class="card shadow-lg">
                        <div class="card-body p-5">
                            <div class="text-center mb-4">
                                <i class="bi bi-mortarboard-fill text-primary" style="font-size: 4rem;"></i>
                                <h2 class="mt-3 page-title">Smart Attendance</h2>
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
        </div>

        <!-- Main Content -->
        <div id="mainContent" class="container-fluid py-4">
            <!-- Dashboard Page -->
            <div id="dashboardPage" class="page-content">
                <div class="row mb-4">
                    <div class="col-12">
                        <h2 class="page-title"><i class="bi bi-speedometer2 me-2"></i>Dashboard</h2>
                        <p class="text-muted">Overview of attendance statistics and recent activity</p>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="row mb-4">
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Total Students</h6>
                                        <div class="stats-number">15</div>
                                    </div>
                                    <div class="text-primary">
                                        <i class="bi bi-people" style="font-size: 2.5rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Today's Present</h6>
                                        <div class="stats-number">12</div>
                                    </div>
                                    <div class="text-success">
                                        <i class="bi bi-check-circle" style="font-size: 2.5rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Today's Absent</h6>
                                        <div class="stats-number">3</div>
                                    </div>
                                    <div class="text-danger">
                                        <i class="bi bi-x-circle" style="font-size: 2.5rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3 mb-3">
                        <div class="card stats-card fade-in">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 class="text-muted">Attendance Rate</h6>
                                        <div class="stats-number">80%</div>
                                    </div>
                                    <div class="text-info">
                                        <i class="bi bi-graph-up" style="font-size: 2.5rem;"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="row mb-4">
                    <div class="col-md-8 mb-3">
                        <div class="card fade-in">
                            <div class="card-header">
                                <h5 class="section-title mb-0">Attendance Trends</h5>
                            </div>
                            <div class="card-body">
                                <canvas id="attendanceTrendsChart" height="100"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <div class="card fade-in">
                            <div class="card-header">
                                <h5 class="section-title mb-0">Department Stats</h5>
                            </div>
                            <div class="card-body">
                                <canvas id="departmentStatsChart" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Activity -->
                <div class="row">
                    <div class="col-12">
                        <div class="card fade-in">
                            <div class="card-header d-flex justify-content-between align-items-center">
                                <h5 class="section-title mb-0">Recent Activity</h5>
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
                                                <td><span class="badge status-badge status-absent">Absent</span></td>
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
                        <h2 class="page-title"><i class="bi bi-people me-2"></i>Student Management</h2>
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
                                <div class="search-box">
                                    <input type="text" class="form-control" id="studentSearch" placeholder="Search students...">
                                </div>
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

            <!-- Attendance Page -->
            <div id="attendancePage" class="page-content d-none">
                <div class="row mb-4">
                    <div class="col-md-8">
                        <h2 class="page-title"><i class="bi bi-check-square me-2"></i>Mark Attendance</h2>
                        <p class="text-muted">Record student attendance for classes</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#markAttendanceModal">
                            <i class="bi bi-check-circle me-2"></i>Mark Attendance
                        </button>
                    </div>
                </div>

                <!-- Attendance Records -->
                <div class="card fade-in">
                    <div class="card-body">
                        <div class="row g-3 mb-3">
                            <div class="col-md-3">
                                <input type="date" class="form-control" id="attendanceDateFilter">
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="attendanceSubjectFilter">
                                    <option value="">All Subjects</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="attendanceDepartmentFilter">
                                    <option value="">All Departments</option>
                                </select>
                            </div>
                            <div class="col-md-2">
                                <select class="form-select" id="attendanceSemesterFilter">
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
                            <div class="col-md-3">
                                <button class="btn btn-outline-secondary w-100" id="filterAttendanceBtn">
                                    <i class="bi bi-funnel me-1"></i>Filter Records
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-hover" id="attendanceTable">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Subject</th>
                                        <th>Department</th>
                                        <th>Semester</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Marked By</th>
                                    </tr>
                                </thead>
                                <tbody id="attendanceTableBody">
                                    <!-- Attendance records will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Mark Attendance Modal -->
    <div class="modal fade" id="markAttendanceModal" tabindex="-1">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Mark Attendance</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="markAttendanceForm">
                        <div class="row g-3 mb-4">
                            <div class="col-md-3">
                                <label class="form-label">Date</label>
                                <input type="date" class="form-control" name="date" required>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Subject</label>
                                <input type="text" class="form-control" name="subject" required>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Department</label>
                                <input type="text" class="form-control" name="department" required>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label">Semester</label>
                                <select class="form-select" name="semester" required>
                                    <option value="">Select Semester</option>
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
                        </div>

                        <div class="mb-3">
                            <button type="button" class="btn btn-outline-primary" id="loadStudentsBtn">
                                <i class="bi bi-people me-1"></i>Load Students
                            </button>
                        </div>

                        <div class="table-responsive">
                            <table class="table table-bordered" id="attendanceStudentsTable">
                                <thead>
                                    <tr>
                                        <th>Roll No</th>
                                        <th>Student ID</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Students will be loaded here -->
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-success" id="markAttendanceSubmitBtn">
                        <i class="bi bi-check-circle me-1"></i>Mark Attendance
                    </button>
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
                this.loadAttendanceTable();
                this.loadDashboardCharts();
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

                // Load students for attendance
                document.getElementById('loadStudentsBtn')?.addEventListener('click', () => {
                    this.loadStudentsForAttendance();
                });

                // Mark attendance
                document.getElementById('markAttendanceSubmitBtn')?.addEventListener('click', () => {
                    this.markAttendance();
                });

                // Filter attendance
                document.getElementById('filterAttendanceBtn')?.addEventListener('click', () => {
                    this.loadAttendanceTable();
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

                tbody.innerHTML = filteredStudents.map(student => \`
                    <tr class="fade-in">
                        <td>\${student.rollNumber}</td>
                        <td>\${student.studentId}</td>
                        <td>\${student.firstName} \${student.lastName}</td>
                        <td>\${student.email}</td>
                        <td>\${student.department}</td>
                        <td>\${student.semester}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button class="btn btn-sm btn-outline-primary" onclick="app.editStudent('\${student._id}')">
                                    <i class="bi bi-pencil"></i>
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="app.deleteStudent('\${student._id}')">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                \`).join('');
            }

            loadAttendanceTable() {
                const tbody = document.getElementById('attendanceTableBody');
                
                tbody.innerHTML = demoAttendance.map(record => \`
                    <tr class="fade-in">
                        <td>\${record.student.firstName} \${record.student.lastName}</td>
                        <td>\${record.subject}</td>
                        <td>\${record.department}</td>
                        <td>\${record.semester}</td>
                        <td><span class="badge status-badge status-\${record.status}">\${record.status}</span></td>
                        <td>\${new Date(record.date).toLocaleDateString()}</td>
                        <td>\${record.teacher.name}</td>
                    </tr>
                \`).join('');
            }

            loadStudentsForAttendance() {
                const form = document.getElementById('markAttendanceForm');
                const department = form.department.value;
                const semester = form.semester.value;

                if (!department || !semester) {
                    this.showToast('Please select department and semester', 'warning');
                    return;
                }

                const tbody = document.querySelector('#attendanceStudentsTable tbody');
                
                tbody.innerHTML = demoStudents.map(student => \`
                    <tr>
                        <td>\${student.rollNumber}</td>
                        <td>\${student.studentId}</td>
                        <td>\${student.firstName} \${student.lastName}</td>
                        <td>
                            <div class="attendance-status-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="status_\${student._id}" 
                                           value="present" id="present_\${student._id}" checked>
                                    <label class="form-check-label" for="present_\${student._id}">Present</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="status_\${student._id}" 
                                           value="absent" id="absent_\${student._id}">
                                    <label class="form-check-label" for="absent_\${student._id}">Absent</label>
                                </div>
                            </div>
                        </td>
                        <td>
                            <input type="text" class="form-control form-control-sm" name="notes_\${student._id}" 
                                   placeholder="Optional notes">
                        </td>
                    </tr>
                \`).join('');
            }

            markAttendance() {
                const form = document.getElementById('markAttendanceForm');
                const classInfo = {
                    date: form.date.value,
                    subject: form.subject.value,
                    department: form.department.value,
                    semester: parseInt(form.semester.value)
                };

                const attendees = [];
                const rows = document.querySelectorAll('#attendanceStudentsTable tbody tr');
                
                rows.forEach(row => {
                    const cells = row.cells;
                    const studentId = cells[1].textContent;
                    const status = row.querySelector('input[type="radio"]:checked')?.value;
                    const notes = row.querySelector('input[type="text"]')?.value || '';

                    if (status) {
                        attendees.push({ studentId, status, notes });
                    }
                });

                if (attendees.length === 0) {
                    this.showToast('No students to mark attendance for', 'warning');
                    return;
                }

                this.showToast('Attendance marked successfully for ' + attendees.length + ' students', 'success');
                bootstrap.Modal.getInstance(document.getElementById('markAttendanceModal')).hide();
                form.reset();
                document.querySelector('#attendanceStudentsTable tbody').innerHTML = '';
                this.loadAttendanceTable();
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

            showToast(message, type = 'info') {
                const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
                
                const toastId = 'toast-' + Date.now();
                const toastHtml = \`
                    <div id="\${toastId}" class="toast" role="alert">
                        <div class="toast-header">
                            <strong class="me-auto">Notification</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                        </div>
                        <div class="toast-body">
                            <div class="alert alert-\${type} mb-0">\${message}</div>
                        </div>
                    </div>
                \`;
                
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

            async loadDashboardCharts() {
                try {
                    // Load attendance trends data
                    const trendsResponse = await fetch('/api/dashboard/trends');
                    const trendsData = await trendsResponse.json();
                    
                    // Load department stats data
                    const deptResponse = await fetch('/api/dashboard/department-stats');
                    const deptData = await deptResponse.json();
                    
                    this.createAttendanceTrendsChart(trendsData.trends);
                    this.createDepartmentStatsChart(deptData.departmentStats);
                } catch (error) {
                    console.error('Error loading dashboard charts:', error);
                }
            }

            createAttendanceTrendsChart(trendsData) {
                const ctx = document.getElementById('attendanceTrendsChart');
                if (!ctx) return;

                const labels = trendsData.map(item => item._id.date);
                const presentData = trendsData.map(item => item.present);
                const absentData = trendsData.map(item => item.absent);

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Present',
                                data: presentData,
                                borderColor: '#4facfe',
                                backgroundColor: 'rgba(79, 172, 254, 0.1)',
                                tension: 0.4,
                                fill: true
                            },
                            {
                                label: 'Absent',
                                data: absentData,
                                borderColor: '#fa709a',
                                backgroundColor: 'rgba(250, 112, 154, 0.1)',
                                tension: 0.4,
                                fill: true
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            title: {
                                display: true,
                                text: 'Last 30 Days Attendance'
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Number of Students'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            }
                        }
                    }
                });
            }

            createDepartmentStatsChart(deptData) {
                const ctx = document.getElementById('departmentStatsChart');
                if (!ctx) return;

                const labels = deptData.map(item => item.department);
                const attendanceData = deptData.map(item => item.attendance.present);
                const totalData = deptData.map(item => item.attendance.total);

                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Attendance',
                            data: attendanceData,
                            backgroundColor: [
                                '#667eea',
                                '#764ba2',
                                '#f093fb',
                                '#f5576c',
                                '#4facfe',
                                '#00f2fe'
                            ],
                            borderWidth: 2,
                            borderColor: '#fff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'bottom'
                            },
                            title: {
                                display: true,
                                text: 'Attendance by Department'
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        const label = context.label || '';
                                        const value = context.parsed || 0;
                                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                        const percentage = ((value / total) * 100).toFixed(1);
                                        return label + ': ' + value + ' (' + percentage + '%)';
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }

        const app = new AttendanceApp();
    </script>
</body>
</html>
`;

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

// Serve beautiful frontend
app.get('/', (req, res) => res.send(beautifulHTML));

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
    console.log(`🚀 Beautiful Server running on port ${PORT}`);
    console.log(`📱 Open browser to: http://localhost:${PORT}`);
    console.log(`🔐 Login with: teacher@demo.com / demo`);
    console.log(`✨ Beautiful UI with 15 students and enhanced design`);
    console.log(`🎨 Features: Modern gradients, animations, and Present/Absent only`);
});
