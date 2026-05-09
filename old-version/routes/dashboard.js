const express = require('express');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { teacherAuth } = require('../middleware/auth');
const moment = require('moment');

const router = express.Router();

// Get dashboard overview
router.get('/overview', teacherAuth, async (req, res) => {
    try {
        const { department, semester } = req.query;

        // Get total students count
        const studentFilter = { isActive: true };
        if (department) studentFilter.department = department;
        if (semester) studentFilter.semester = parseInt(semester);

        const totalStudents = await Student.countDocuments(studentFilter);

        // Get today's attendance statistics
        const today = moment().startOf('day');
        const todayFilter = {
            date: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }
        };
        if (department) todayFilter.department = department;
        if (semester) todayFilter.semester = parseInt(semester);

        const todayStats = await Attendance.getStatistics(todayFilter);

        // Get this week's attendance statistics
        const weekStart = moment().startOf('isoWeek');
        const weekFilter = {
            date: {
                $gte: weekStart.toDate(),
                $lte: moment().endOf('day').toDate()
            }
        };
        if (department) weekFilter.department = department;
        if (semester) weekFilter.semester = parseInt(semester);

        const weekStats = await Attendance.getStatistics(weekFilter);

        // Get this month's attendance statistics
        const monthStart = moment().startOf('month');
        const monthFilter = {
            date: {
                $gte: monthStart.toDate(),
                $lte: moment().endOf('day').toDate()
            }
        };
        if (department) monthFilter.department = department;
        if (semester) monthFilter.semester = parseInt(semester);

        const monthStats = await Attendance.getStatistics(monthFilter);

        res.json({
            overview: {
                totalStudents,
                todayStats,
                weekStats,
                monthStats
            },
            filters: {
                department,
                semester
            }
        });
    } catch (error) {
        console.error('Get dashboard overview error:', error);
        res.status(500).json({ message: 'Server error fetching dashboard overview' });
    }
});

// Get recent attendance activity
router.get('/recent-activity', teacherAuth, async (req, res) => {
    try {
        const { limit = 10, department, semester } = req.query;

        const filter = {};
        if (department) filter.department = department;
        if (semester) filter.semester = parseInt(semester);

        const recentAttendance = await Attendance.find(filter)
            .populate('student', 'firstName lastName studentId rollNumber')
            .populate('teacher', 'name email')
            .sort({ markedAt: -1 })
            .limit(parseInt(limit));

        res.json({
            recentAttendance,
            filters: {
                department,
                semester
            }
        });
    } catch (error) {
        console.error('Get recent activity error:', error);
        res.status(500).json({ message: 'Server error fetching recent activity' });
    }
});

// Get department-wise statistics
router.get('/department-stats', teacherAuth, async (req, res) => {
    try {
        const { date } = req.query;

        const dateFilter = {};
        if (date) {
            dateFilter.date = {
                $gte: moment(date).startOf('day').toDate(),
                $lte: moment(date).endOf('day').toDate()
            };
        } else {
            // Default to today
            const today = moment().startOf('day');
            dateFilter.date = {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            };
        }

        const departmentStats = await Attendance.aggregate([
            { $match: dateFilter },
            {
                $group: {
                    _id: '$department',
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
            { $sort: { _id: 1 } }
        ]);

        // Get student counts per department
        const departmentStudentCounts = await Student.aggregate([
            { $match: { isActive: true } },
            {
                $group: {
                    _id: '$department',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Merge attendance stats with student counts
        const mergedStats = departmentStats.map(stat => {
            const studentCount = departmentStudentCounts.find(
                sc => sc._id === stat._id
            );
            return {
                department: stat._id,
                totalStudents: studentCount ? studentCount.count : 0,
                attendance: {
                    total: stat.total,
                    present: stat.present,
                    absent: stat.absent,
                    late: stat.late,
                    excused: stat.excused
                }
            };
        });

        res.json({
            date: date || moment().format('YYYY-MM-DD'),
            departmentStats: mergedStats
        });
    } catch (error) {
        console.error('Get department stats error:', error);
        res.status(500).json({ message: 'Server error fetching department statistics' });
    }
});

// Get top performers and low performers
router.get('/performance', teacherAuth, async (req, res) => {
    try {
        const { 
            department, 
            semester, 
            period = 'month', // week, month, quarter
            limit = 10 
        } = req.query;

        // Calculate date range based on period
        let startDate;
        const endDate = moment().endOf('day').toDate();

        switch (period) {
            case 'week':
                startDate = moment().subtract(1, 'week').startOf('day').toDate();
                break;
            case 'month':
                startDate = moment().subtract(1, 'month').startOf('day').toDate();
                break;
            case 'quarter':
                startDate = moment().subtract(3, 'months').startOf('day').toDate();
                break;
            default:
                startDate = moment().subtract(1, 'month').startOf('day').toDate();
        }

        const matchStage = {
            date: { $gte: startDate, $lte: endDate }
        };
        if (department) matchStage.department = department;
        if (semester) matchStage.semester = parseInt(semester);

        // Get student performance statistics
        const performanceStats = await Attendance.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$student',
                    totalClasses: { $sum: 1 },
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
            {
                $addFields: {
                    attendancePercentage: {
                        $multiply: [
                            {
                                $divide: [
                                    { $add: ["$present", "$late", "$excused"] },
                                    "$totalClasses"
                                ]
                            },
                            100
                        ]
                    }
                }
            },
            { $sort: { attendancePercentage: -1 } }
        ]);

        // Populate student details
        const populatedStats = await Student.populate(performanceStats, {
            path: '_id',
            select: 'firstName lastName studentId rollNumber department semester'
        });

        // Separate top and low performers
        const topPerformers = populatedStats
            .filter(stat => stat._id)
            .slice(0, parseInt(limit))
            .map(stat => ({
                student: stat._id,
                totalClasses: stat.totalClasses,
                present: stat.present,
                absent: stat.absent,
                late: stat.late,
                excused: stat.excused,
                attendancePercentage: Math.round(stat.attendancePercentage * 100) / 100
            }));

        const lowPerformers = populatedStats
            .filter(stat => stat._id)
            .reverse()
            .slice(0, parseInt(limit))
            .map(stat => ({
                student: stat._id,
                totalClasses: stat.totalClasses,
                present: stat.present,
                absent: stat.absent,
                late: stat.late,
                excused: stat.excused,
                attendancePercentage: Math.round(stat.attendancePercentage * 100) / 100
            }));

        res.json({
            period: {
                startDate: moment(startDate).format('YYYY-MM-DD'),
                endDate: moment(endDate).format('YYYY-MM-DD'),
                period
            },
            filters: {
                department,
                semester
            },
            topPerformers,
            lowPerformers
        });
    } catch (error) {
        console.error('Get performance stats error:', error);
        res.status(500).json({ message: 'Server error fetching performance statistics' });
    }
});

// Get attendance trends for charts
router.get('/trends', teacherAuth, async (req, res) => {
    try {
        const { 
            department, 
            semester, 
            days = 30 
        } = req.query;

        const startDate = moment().subtract(parseInt(days), 'days').startOf('day').toDate();
        const endDate = moment().endOf('day').toDate();

        const matchStage = {
            date: { $gte: startDate, $lte: endDate }
        };
        if (department) matchStage.department = department;
        if (semester) matchStage.semester = parseInt(semester);

        const trends = await Attendance.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: {
                        date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
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
            { $sort: { "_id": 1 } }
        ]);

        res.json({
            period: {
                startDate: moment(startDate).format('YYYY-MM-DD'),
                endDate: moment(endDate).format('YYYY-MM-DD'),
                days: parseInt(days)
            },
            filters: {
                department,
                semester
            },
            trends
        });
    } catch (error) {
        console.error('Get dashboard trends error:', error);
        res.status(500).json({ message: 'Server error fetching dashboard trends' });
    }
});

module.exports = router;
