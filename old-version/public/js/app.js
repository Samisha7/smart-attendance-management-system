// Smart Attendance Management System - Frontend JavaScript

class AttendanceApp {
    constructor() {
        this.apiBase = '/api';
        this.token = localStorage.getItem('token');
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.charts = {};
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.checkAuth();
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

        // Student management
        document.getElementById('saveStudentBtn')?.addEventListener('click', () => {
            this.saveStudent();
        });

        document.getElementById('updateStudentBtn')?.addEventListener('click', () => {
            this.updateStudent();
        });

        document.getElementById('filterStudentsBtn')?.addEventListener('click', () => {
            this.loadStudents();
        });

        // Attendance management
        document.getElementById('loadStudentsBtn')?.addEventListener('click', () => {
            this.loadStudentsForAttendance();
        });

        document.getElementById('markAttendanceSubmitBtn')?.addEventListener('click', () => {
            this.markAttendance();
        });

        document.getElementById('filterAttendanceBtn')?.addEventListener('click', () => {
            this.loadAttendance();
        });

        // Reports
        document.getElementById('generateReportBtn')?.addEventListener('click', () => {
            this.generateReport();
        });

        // Dashboard
        document.getElementById('refreshActivityBtn')?.addEventListener('click', () => {
            this.loadRecentActivity();
        });

        // Search and filter inputs
        document.getElementById('studentSearch')?.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => this.loadStudents(), 500);
        });
    }

    async checkAuth() {
        if (this.token) {
            try {
                const response = await this.apiCall('/auth/profile', 'GET');
                if (response.user) {
                    this.currentUser = response.user;
                    this.showMainContent();
                    this.navigateToPage('dashboard');
                } else {
                    this.showLogin();
                }
            } catch (error) {
                this.showLogin();
            }
        } else {
            this.showLogin();
        }
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

    async login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await this.apiCall('/auth/login', 'POST', { email, password });
            
            if (response.token) {
                this.token = response.token;
                localStorage.setItem('token', this.token);
                this.currentUser = response.user;
                this.showMainContent();
                this.navigateToPage('dashboard');
                this.showToast('Login successful!', 'success');
            }
        } catch (error) {
            this.showToast(error.message || 'Login failed', 'danger');
        }
    }

    logout() {
        this.token = null;
        this.currentUser = null;
        localStorage.removeItem('token');
        this.showLogin();
        this.showToast('Logged out successfully', 'info');
    }

    navigateToPage(page) {
        // Hide all pages
        document.querySelectorAll('.page-content').forEach(p => {
            p.classList.add('d-none');
        });

        // Show selected page
        document.getElementById(`${page}Page`)?.classList.remove('d-none');

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`.nav-link[data-page="${page}"]`)?.classList.add('active');

        this.currentPage = page;

        // Load page-specific data
        switch (page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'students':
                this.loadStudents();
                this.loadDepartments();
                break;
            case 'attendance':
                this.loadAttendance();
                this.loadDepartments();
                this.loadSubjects();
                break;
            case 'reports':
                this.loadDepartments();
                this.loadSubjects();
                break;
        }
    }

    async apiCall(endpoint, method = 'GET', data = null) {
        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(`${this.apiBase}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API call failed');
        }

        return result;
    }

    async loadDashboard() {
        try {
            // Load overview statistics
            const overview = await this.apiCall('/dashboard/overview');
            this.renderDashboardStats(overview.overview);

            // Load recent activity
            this.loadRecentActivity();

            // Load trends for charts
            this.loadDashboardTrends();
            this.loadDepartmentStats();
        } catch (error) {
            console.error('Error loading dashboard:', error);
            this.showToast('Error loading dashboard', 'danger');
        }
    }

    renderDashboardStats(stats) {
        const statsContainer = document.getElementById('dashboardStats');
        
        const statsCards = [
            {
                title: 'Total Students',
                value: stats.totalStudents,
                icon: 'bi-people',
                color: 'primary'
            },
            {
                title: "Today's Present",
                value: stats.todayStats.present,
                total: stats.todayStats.total,
                icon: 'bi-check-circle',
                color: 'success'
            },
            {
                title: "Today's Absent",
                value: stats.todayStats.absent,
                total: stats.todayStats.total,
                icon: 'bi-x-circle',
                color: 'danger'
            },
            {
                title: 'Monthly Attendance',
                value: `${stats.monthStats.total > 0 ? 
                    Math.round((stats.monthStats.present + stats.monthStats.late + stats.monthStats.excused) / stats.monthStats.total * 100) : 0}%`,
                icon: 'bi-graph-up',
                color: 'info'
            }
        ];

        statsContainer.innerHTML = statsCards.map(card => `
            <div class="col-md-3 mb-3">
                <div class="card stats-card ${card.color}">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="stats-label">${card.title}</h6>
                                <div class="stats-number">${card.value}</div>
                                ${card.total ? `<small class="text-muted">of ${card.total}</small>` : ''}
                            </div>
                            <div class="text-${card.color}">
                                <i class="bi ${card.icon}" style="font-size: 2rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    async loadRecentActivity() {
        try {
            const response = await this.apiCall('/dashboard/recent-activity?limit=10');
            this.renderRecentActivity(response.recentAttendance);
        } catch (error) {
            console.error('Error loading recent activity:', error);
        }
    }

    renderRecentActivity(activities) {
        const tbody = document.querySelector('#recentActivityTable tbody');
        
        if (activities.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No recent activity</td></tr>';
            return;
        }

        tbody.innerHTML = activities.map(activity => `
            <tr>
                <td>${activity.student.firstName} ${activity.student.lastName}</td>
                <td>${activity.subject}</td>
                <td><span class="badge status-badge status-${activity.status}">${activity.status}</span></td>
                <td>${new Date(activity.date).toLocaleDateString()}</td>
                <td>${activity.teacher.name}</td>
            </tr>
        `).join('');
    }

    async loadDashboardTrends() {
        try {
            const response = await this.apiCall('/dashboard/trends?days=30');
            this.renderTrendsChart(response.trends);
        } catch (error) {
            console.error('Error loading trends:', error);
        }
    }

    renderTrendsChart(trends) {
        const ctx = document.getElementById('attendanceTrendsChart');
        if (!ctx) return;

        if (this.charts.trends) {
            this.charts.trends.destroy();
        }

        this.charts.trends = new Chart(ctx, {
            type: 'line',
            data: {
                labels: trends.map(t => t._id.date),
                datasets: [{
                    label: 'Present',
                    data: trends.map(t => t.present),
                    borderColor: '#198754',
                    backgroundColor: 'rgba(25, 135, 84, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Absent',
                    data: trends.map(t => t.absent),
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    async loadDepartmentStats() {
        try {
            const response = await this.apiCall('/dashboard/department-stats');
            this.renderDepartmentChart(response.departmentStats);
        } catch (error) {
            console.error('Error loading department stats:', error);
        }
    }

    renderDepartmentChart(stats) {
        const ctx = document.getElementById('departmentStatsChart');
        if (!ctx) return;

        if (this.charts.department) {
            this.charts.department.destroy();
        }

        this.charts.department = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: stats.map(s => s.department),
                datasets: [{
                    data: stats.map(s => s.attendance.total),
                    backgroundColor: [
                        '#0d6efd',
                        '#198754',
                        '#ffc107',
                        '#dc3545',
                        '#0dcaf0',
                        '#6f42c1'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    }

    async loadStudents(page = 1) {
        try {
            const search = document.getElementById('studentSearch')?.value || '';
            const department = document.getElementById('departmentFilter')?.value || '';
            const semester = document.getElementById('semesterFilter')?.value || '';
            const sortBy = document.getElementById('sortBy')?.value || 'createdAt';

            const params = new URLSearchParams({
                page,
                limit: 10,
                search,
                department,
                semester,
                sortBy
            });

            const response = await this.apiCall(`/students?${params}`);
            this.renderStudents(response.students);
            this.renderPagination('studentsPagination', response.pagination, () => this.loadStudents);
        } catch (error) {
            console.error('Error loading students:', error);
            this.showToast('Error loading students', 'danger');
        }
    }

    renderStudents(students) {
        const tbody = document.querySelector('#studentsTable tbody');
        
        if (students.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-muted">No students found</td></tr>';
            return;
        }

        tbody.innerHTML = students.map(student => `
            <tr>
                <td>${student.studentId}</td>
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>${student.semester}</td>
                <td>${student.rollNumber}</td>
                <td>
                    <div class="action-buttons">
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

    async saveStudent() {
        const form = document.getElementById('addStudentForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            await this.apiCall('/students', 'POST', data);
            this.showToast('Student added successfully', 'success');
            bootstrap.Modal.getInstance(document.getElementById('addStudentModal')).hide();
            form.reset();
            this.loadStudents();
        } catch (error) {
            this.showToast(error.message || 'Error adding student', 'danger');
        }
    }

    async editStudent(studentId) {
        try {
            const response = await this.apiCall(`/students/${studentId}`);
            const student = response.student;

            const form = document.getElementById('editStudentForm');
            Object.keys(student).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = student[key];
                }
            });

            new bootstrap.Modal(document.getElementById('editStudentModal')).show();
        } catch (error) {
            this.showToast('Error loading student data', 'danger');
        }
    }

    async updateStudent() {
        const form = document.getElementById('editStudentForm');
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const studentId = data.id;
        delete data.id;

        try {
            await this.apiCall(`/students/${studentId}`, 'PUT', data);
            this.showToast('Student updated successfully', 'success');
            bootstrap.Modal.getInstance(document.getElementById('editStudentModal')).hide();
            this.loadStudents();
        } catch (error) {
            this.showToast(error.message || 'Error updating student', 'danger');
        }
    }

    async deleteStudent(studentId) {
        if (!confirm('Are you sure you want to delete this student?')) return;

        try {
            await this.apiCall(`/students/${studentId}`, 'DELETE');
            this.showToast('Student deleted successfully', 'success');
            this.loadStudents();
        } catch (error) {
            this.showToast(error.message || 'Error deleting student', 'danger');
        }
    }

    async loadDepartments() {
        try {
            const response = await this.apiCall('/students/departments/list');
            const departments = response.departments;

            // Update all department select elements
            const departmentSelects = [
                'departmentFilter',
                'attendanceDepartmentFilter',
                'reportDepartment'
            ];

            departmentSelects.forEach(selectId => {
                const select = document.getElementById(selectId);
                if (select) {
                    const currentValue = select.value;
                    select.innerHTML = '<option value="">All Departments</option>' +
                        departments.map(dept => `<option value="${dept}">${dept}</option>`).join('');
                    select.value = currentValue;
                }
            });
        } catch (error) {
            console.error('Error loading departments:', error);
        }
    }

    async loadSubjects() {
        try {
            const response = await this.apiCall('/attendance/subjects/list');
            const subjects = response.subjects;

            // Update all subject select elements
            const subjectSelects = [
                'attendanceSubjectFilter',
                'reportSubject'
            ];

            subjectSelects.forEach(selectId => {
                const select = document.getElementById(selectId);
                if (select) {
                    const currentValue = select.value;
                    select.innerHTML = '<option value="">All Subjects</option>' +
                        subjects.map(subject => `<option value="${subject}">${subject}</option>`).join('');
                    select.value = currentValue;
                }
            });
        } catch (error) {
            console.error('Error loading subjects:', error);
        }
    }

    async loadStudentsForAttendance() {
        const form = document.getElementById('markAttendanceForm');
        const department = form.department.value;
        const semester = form.semester.value;

        if (!department || !semester) {
            this.showToast('Please select department and semester', 'warning');
            return;
        }

        try {
            const response = await this.apiCall(`/students?department=${department}&semester=${semester}&limit=100`);
            this.renderAttendanceStudents(response.students);
        } catch (error) {
            this.showToast('Error loading students', 'danger');
        }
    }

    renderAttendanceStudents(students) {
        const tbody = document.querySelector('#attendanceStudentsTable tbody');
        
        tbody.innerHTML = students.map(student => `
            <tr>
                <td>${student.rollNumber}</td>
                <td>${student.studentId}</td>
                <td>${student.firstName} ${student.lastName}</td>
                <td>
                    <div class="attendance-status-group">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status_${student._id}" 
                                   value="present" id="present_${student._id}" checked>
                            <label class="form-check-label" for="present_${student._id}">P</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status_${student._id}" 
                                   value="absent" id="absent_${student._id}">
                            <label class="form-check-label" for="absent_${student._id}">A</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status_${student._id}" 
                                   value="late" id="late_${student._id}">
                            <label class="form-check-label" for="late_${student._id}">L</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="status_${student._id}" 
                                   value="excused" id="excused_${student._id}">
                            <label class="form-check-label" for="excused_${student._id}">E</label>
                        </div>
                    </div>
                </td>
                <td>
                    <input type="text" class="form-control form-control-sm" name="notes_${student._id}" 
                           placeholder="Optional notes">
                </td>
            </tr>
        `).join('');
    }

    async markAttendance() {
        const form = document.getElementById('markAttendanceForm');
        const formData = new FormData(form);
        const classInfo = {
            date: formData.get('date'),
            subject: formData.get('subject'),
            department: formData.get('department'),
            semester: parseInt(formData.get('semester'))
        };

        // Collect attendance data from the table
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

        try {
            await this.apiCall('/attendance/mark', 'POST', {
                ...classInfo,
                attendees
            });

            this.showToast('Attendance marked successfully', 'success');
            bootstrap.Modal.getInstance(document.getElementById('markAttendanceModal')).hide();
            form.reset();
            document.querySelector('#attendanceStudentsTable tbody').innerHTML = '';
            this.loadAttendance();
        } catch (error) {
            this.showToast(error.message || 'Error marking attendance', 'danger');
        }
    }

    async loadAttendance(page = 1) {
        try {
            const date = document.getElementById('attendanceDateFilter')?.value || '';
            const subject = document.getElementById('attendanceSubjectFilter')?.value || '';
            const department = document.getElementById('attendanceDepartmentFilter')?.value || '';
            const semester = document.getElementById('attendanceSemesterFilter')?.value || '';

            const params = new URLSearchParams({
                page,
                limit: 10,
                date,
                subject,
                department,
                semester
            });

            const response = await this.apiCall(`/attendance?${params}`);
            this.renderAttendance(response.attendance);
            this.renderPagination('attendancePagination', response.pagination, () => this.loadAttendance);
        } catch (error) {
            console.error('Error loading attendance:', error);
            this.showToast('Error loading attendance records', 'danger');
        }
    }

    renderAttendance(attendance) {
        const tbody = document.querySelector('#attendanceTable tbody');
        
        if (attendance.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted">No attendance records found</td></tr>';
            return;
        }

        tbody.innerHTML = attendance.map(record => `
            <tr>
                <td>${record.student.firstName} ${record.student.lastName}</td>
                <td>${record.subject}</td>
                <td>${record.department}</td>
                <td>${record.semester}</td>
                <td><span class="badge status-badge status-${record.status}">${record.status}</span></td>
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td>${record.teacher.name}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-outline-primary" onclick="app.editAttendance('${record._id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="app.deleteAttendance('${record._id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    async generateReport() {
        const reportType = document.getElementById('reportType').value;
        const startDate = document.getElementById('reportStartDate').value;
        const endDate = document.getElementById('reportEndDate').value;
        const department = document.getElementById('reportDepartment').value;
        const semester = document.getElementById('reportSemester').value;

        try {
            let response;
            const params = new URLSearchParams({
                startDate,
                endDate,
                department,
                semester
            });

            switch (reportType) {
                case 'statistics':
                    response = await this.apiCall(`/reports/statistics?${params}`);
                    this.renderStatisticsReport(response);
                    break;
                case 'student':
                    // This would need a student selection
                    this.showToast('Please select a student for student report', 'info');
                    break;
                case 'class':
                    if (!department || !semester) {
                        this.showToast('Department and semester required for class report', 'warning');
                        return;
                    }
                    response = await this.apiCall(`/reports/class?${params}`);
                    this.renderClassReport(response);
                    break;
                case 'daily':
                    response = await this.apiCall(`/reports/daily?${params}`);
                    this.renderDailyReport(response);
                    break;
                case 'trends':
                    response = await this.apiCall(`/reports/trends?${params}`);
                    this.renderTrendsReport(response);
                    break;
            }
        } catch (error) {
            this.showToast('Error generating report', 'danger');
        }
    }

    renderStatisticsReport(data) {
        const container = document.getElementById('reportResults');
        const { statistics } = data;

        container.innerHTML = `
            <div class="card">
                <div class="report-header">
                    <h4>Attendance Statistics</h4>
                    <p>Period: ${data.filters.startDate || 'All time'} - ${data.filters.endDate || 'Present'}</p>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="text-center">
                                <h3 class="text-primary">${statistics.total}</h3>
                                <p class="text-muted">Total Records</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="text-center">
                                <h3 class="text-success">${statistics.present}</h3>
                                <p class="text-muted">Present</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="text-center">
                                <h3 class="text-danger">${statistics.absent}</h3>
                                <p class="text-muted">Absent</p>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="text-center">
                                <h3 class="text-warning">${statistics.late}</h3>
                                <p class="text-muted">Late</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPagination(containerId, pagination, loadFunction) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const { currentPage, totalPages } = pagination;

        let html = '';
        
        // Previous button
        html += `
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="app.goToPage(${currentPage - 1}, ${loadFunction})">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                html += `
                    <li class="page-item ${i === currentPage ? 'active' : ''}">
                        <a class="page-link" href="#" onclick="app.goToPage(${i}, ${loadFunction})">${i}</a>
                    </li>
                `;
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                html += '<li class="page-item disabled"><a class="page-link">...</a></li>';
            }
        }

        // Next button
        html += `
            <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" onclick="app.goToPage(${currentPage + 1}, ${loadFunction})">Next</a>
            </li>
        `;

        container.innerHTML = html;
    }

    goToPage(page, loadFunction) {
        loadFunction.bind(this)(page);
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
        document.body.appendChild(container);
        return container;
    }
}

// Initialize the app
const app = new AttendanceApp();
