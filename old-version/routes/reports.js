const express = require('express');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { teacherAuth } = require('../middleware/auth');
const moment = require('moment');

const router = express.Router();

// Get attendance statistics
router.get('/statistics', teacherAuth, async (req, res) => {
    try {
        const {
            startDate,
            endDate,
            department,
            semester,
            subject
        } = req.query;

        const filters = {};
        if (startDate) filters.startDate = startDate;
        if (endDate) filters.endDate = endDate;
        if (department) filters.department = department;
        if (semester) filters.semester = parseInt(semester);
        if (subject) filters.subject = subject;

        const statistics = await Attendance.getStatistics(filters);
        
        res.json({
            statistics,
            filters: {
                startDate,
                endDate,
                department,
                semester,
                subject
            }
        });
    } catch (error) {
        console.error('Get statistics error:', error);
        res.status(500).json({ message: 'Server error fetching statistics' });
    }
});

// Get attendance report for a specific student
router.get('/student/:studentId', teacherAuth, async (req, res) => {
    try {
        const { studentId } = req.params;
        const { startDate, endDate } = req.query;

        // Validate student exists
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Build date filter
        const dateFilter = {};
        if (startDate && endDate) {
            dateFilter.date = {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            };
        }

        // Get attendance records
        const attendanceRecords = await Attendance.find({
            student: studentId,
            ...dateFilter
        }).sort({ date: -1 });

        // Calculate statistics
        const totalClasses = attendanceRecords.length;
        const presentCount = attendanceRecords.filter(r => r.status === 'present').length;
        const absentCount = attendanceRecords.filter(r => r.status === 'absent').length;
        const lateCount = attendanceRecords.filter(r => r.status === 'late').length;
        const excusedCount = attendanceRecords.filter(r => r.status === 'excused').length;

        const attendancePercentage = totalClasses > 0 ? 
            ((presentCount + lateCount + excusedCount) / totalClasses * 100).toFixed(2) : 0;

        // Group by subject
        const subjectStats = {};
        attendanceRecords.forEach(record => {
            if (!subjectStats[record.subject]) {
                subjectStats[record.subject] = {
                    total: 0,
                    present: 0,
                    absent: 0,
                    late: 0,
                    excused: 0
                };
            }
            subjectStats[record.subject].total++;
            subjectStats[record.subject][record.status]++;
        });

        res.json({
            student,
            period: {
                startDate,
                endDate
            },
            summary: {
                totalClasses,
                presentCount,
                absentCount,
                lateCount,
                excusedCount,
                attendancePercentage: parseFloat(attendancePercentage)
            },
            subjectStats,
            attendanceRecords
        });
    } catch (error) {
        console.error('Get student report error:', error);
        res.status(500).json({ message: 'Server error generating student report' });
    }
});

// Get class attendance report
router.get('/class', teacherAuth, async (req, res) => {
    try {
        const {
            department,
            semester,
            subject,
            startDate,
            endDate
        } = req.query;

        if (!department || !semester || !subject) {
            return res.status(400).json({ 
                message: 'Department, semester, and subject are required' 
            });
        }

        // Build date filter
        const dateFilter = {};
        if (startDate && endDate) {
            dateFilter.date = {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            };
        }

        // Get all students in the class
        const students = await Student.find({
            department,
            semester: parseInt(semester),
            isActive: true
        }).sort({ rollNumber: 1 });

        // Get attendance records for the class
        const attendanceRecords = await Attendance.find({
            department,
            semester: parseInt(semester),
            subject,
            ...dateFilter
        }).populate('student', 'firstName lastName studentId rollNumber');

        // Calculate statistics for each student
        const studentStats = students.map(student => {
            const studentAttendance = attendanceRecords.filter(
                record => record.student._id.toString() === student._id.toString()
            );

            const totalClasses = studentAttendance.length;
            const presentCount = studentAttendance.filter(r => r.status === 'present').length;
            const absentCount = studentAttendance.filter(r => r.status === 'absent').length;
            const lateCount = studentAttendance.filter(r => r.status === 'late').length;
            const excusedCount = studentAttendance.filter(r => r.status === 'excused').length;

            const attendancePercentage = totalClasses > 0 ? 
                ((presentCount + lateCount + excusedCount) / totalClasses * 100).toFixed(2) : 0;

            return {
                student: {
                    _id: student._id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    studentId: student.studentId,
                    rollNumber: student.rollNumber
                },
                summary: {
                    totalClasses,
                    presentCount,
                    absentCount,
                    lateCount,
                    excusedCount,
                    attendancePercentage: parseFloat(attendancePercentage)
                }
            };
        });

        // Calculate overall class statistics
        const totalStudents = students.length;
        const averageAttendance = studentStats.length > 0 ? 
            (studentStats.reduce((sum, stat) => sum + stat.summary.attendancePercentage, 0) / totalStudents).toFixed(2) : 0;

        res.json({
            classInfo: {
                department,
                semester: parseInt(semester),
                subject,
                totalStudents
            },
            period: {
                startDate,
                endDate
            },
            summary: {
                averageAttendance: parseFloat(averageAttendance)
            },
            studentStats
        });
    } catch (error) {
        console.error('Get class report error:', error);
        res.status(500).json({ message: 'Server error generating class report' });
    }
});

// Get daily attendance report
router.get('/daily', teacherAuth, async (req, res) => {
    try {
        const {
            startDate,
            endDate,
            department,
            semester,
            subject
        } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ 
                message: 'Start date and end date are required' 
            });
        }

        // Build date filter
        const dateFilter = {
            date: {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            }
        };

        if (department) dateFilter.department = department;
        if (semester) dateFilter.semester = parseInt(semester);
        if (subject) dateFilter.subject = subject;

        // Get attendance records grouped by date
        const dailyStats = await Attendance.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                        subject: "$subject"
                    },
                    total: { $sum: 1 },
                    present: {
                        $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] }
                    },
                    absent: {
                        $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] }
                    },
                    late: {
                        $sum: { $cond: [{ $eq: ["$status", "late"] }, 1, 0] }
                    },
                    excused: {
                        $sum: { $cond: [{ $eq: ["$status", "excused"] }, 1, 0] }
                    }
                }
            },
            { $sort: { "_id.date": 1, "_id.subject": 1 } }
        ]);

        res.json({
            period: {
                startDate,
                endDate
            },
            filters: {
                department,
                semester,
                subject
            },
            dailyStats
        });
    } catch (error) {
        console.error('Get daily report error:', error);
        res.status(500).json({ message: 'Server error generating daily report' });
    }
});

// Get monthly attendance trends
router.get('/trends', teacherAuth, async (req, res) => {
    try {
        const {
            months = 6,
            department,
            semester,
            subject
        } = req.query;

        const startDate = moment().subtract(parseInt(months), 'months').startOf('month').toDate();
        const endDate = moment().endOf('month').toDate();

        const matchStage = {
            date: { $gte: startDate, $lte: endDate }
        };

        if (department) matchStage.department = department;
        if (semester) matchStage.semester = parseInt(semester);
        if (subject) matchStage.subject = subject;

        const trends = await Attendance.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" }
                    },
                    total: { $sum: 1 },
                    present: {
                        $sum: { $cond: [{ $eq: ["$status", "present"] }, 1, 0] }
                    },
                    absent: {
                        $sum: { $cond: [{ $eq: ["$status", "absent"] }, 1, 0] }
                    },
                    late: {
                        $sum: { $cond: [{ $eq: ["$status", "late"] }, 1, 0] }
                    },
                    excused: {
                        $sum: { $cond: [{ $eq: ["$status", "excused"] }, 1, 0] }
                    }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json({
            period: {
                startDate: moment(startDate).format('YYYY-MM-DD'),
                endDate: moment(endDate).format('YYYY-MM-DD'),
                months: parseInt(months)
            },
            filters: {
                department,
                semester,
                subject
            },
            trends
        });
    } catch (error) {
        console.error('Get trends error:', error);
        res.status(500).json({ message: 'Server error generating trends report' });
    }
});

module.exports = router;
