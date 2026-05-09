const express = require('express');
const { body, validationResult } = require('express-validator');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const { teacherAuth } = require('../middleware/auth');
const moment = require('moment');

const router = express.Router();

// Mark attendance for multiple students
router.post('/mark', teacherAuth, [
    body('date').isISO8601().withMessage('Valid date is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
    body('attendees').isArray().withMessage('Attendees must be an array'),
    body('attendees.*.studentId').notEmpty().withMessage('Student ID is required'),
    body('attendees.*.status').isIn(['present', 'absent', 'late', 'excused']).withMessage('Invalid attendance status')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { date, subject, department, semester, attendees } = req.body;
        const teacherId = req.user._id;

        // Validate that all students exist
        const studentIds = attendees.map(a => a.studentId);
        const students = await Student.find({ 
            _id: { $in: studentIds },
            department,
            semester,
            isActive: true 
        });

        if (students.length !== studentIds.length) {
            return res.status(400).json({ 
                message: 'Some students not found or not in the specified department/semester' 
            });
        }

        const attendanceRecords = [];
        const attendanceErrors = [];

        for (const attendee of attendees) {
            try {
                const attendance = new Attendance({
                    student: attendee.studentId,
                    teacher: teacherId,
                    date: new Date(date),
                    subject,
                    department,
                    semester,
                    status: attendee.status,
                    notes: attendee.notes || ''
                });

                await attendance.save();
                attendanceRecords.push(attendance);
            } catch (error) {
                if (error.code === 11000) {
                    attendanceErrors.push(`Attendance already marked for student ${attendee.studentId}`);
                } else {
                    attendanceErrors.push(`Error marking attendance for student ${attendee.studentId}: ${error.message}`);
                }
            }
        }

        res.status(201).json({
            message: `Attendance marked for ${attendanceRecords.length} students`,
            attendanceRecords,
            errors: attendanceErrors.length > 0 ? attendanceErrors : undefined
        });
    } catch (error) {
        console.error('Mark attendance error:', error);
        res.status(500).json({ message: 'Server error marking attendance' });
    }
});

// Get attendance records with filters
router.get('/', teacherAuth, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            date,
            startDate,
            endDate,
            subject,
            department,
            semester,
            status,
            studentId,
            sortBy = 'date',
            sortOrder = 'desc'
        } = req.query;

        // Build filter query
        const filter = {};

        if (date) {
            filter.date = {
                $gte: moment(date).startOf('day').toDate(),
                $lte: moment(date).endOf('day').toDate()
            };
        } else if (startDate && endDate) {
            filter.date = {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            };
        } else if (startDate) {
            filter.date = {
                $gte: moment(startDate).startOf('day').toDate()
            };
        }

        if (subject) {
            filter.subject = subject;
        }

        if (department) {
            filter.department = department;
        }

        if (semester) {
            filter.semester = parseInt(semester);
        }

        if (status) {
            filter.status = status;
        }

        if (studentId) {
            filter.student = studentId;
        }

        // Build sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const attendance = await Attendance.find(filter)
            .populate('student', 'firstName lastName studentId rollNumber email')
            .populate('teacher', 'name email')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Attendance.countDocuments(filter);

        res.json({
            attendance,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalRecords: total,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Get attendance error:', error);
        res.status(500).json({ message: 'Server error fetching attendance records' });
    }
});

// Get attendance for a specific student
router.get('/student/:studentId', teacherAuth, async (req, res) => {
    try {
        const { studentId } = req.params;
        const { startDate, endDate, subject } = req.query;

        const filter = { student: studentId };

        if (startDate && endDate) {
            filter.date = {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            };
        }

        if (subject) {
            filter.subject = subject;
        }

        const attendance = await Attendance.find(filter)
            .populate('teacher', 'name email')
            .sort({ date: -1 });

        res.json({ attendance });
    } catch (error) {
        console.error('Get student attendance error:', error);
        res.status(500).json({ message: 'Server error fetching student attendance' });
    }
});

// Get attendance for a specific date and subject
router.get('/date/:date/subject/:subject', teacherAuth, async (req, res) => {
    try {
        const { date, subject } = req.params;
        const { department, semester } = req.query;

        const filter = {
            date: {
                $gte: moment(date).startOf('day').toDate(),
                $lte: moment(date).endOf('day').toDate()
            },
            subject
        };

        if (department) {
            filter.department = department;
        }

        if (semester) {
            filter.semester = parseInt(semester);
        }

        const attendance = await Attendance.find(filter)
            .populate('student', 'firstName lastName studentId rollNumber')
            .populate('teacher', 'name email')
            .sort({ 'student.rollNumber': 1 });

        res.json({ attendance });
    } catch (error) {
        console.error('Get date attendance error:', error);
        res.status(500).json({ message: 'Server error fetching attendance for date' });
    }
});

// Update attendance record
router.put('/:id', teacherAuth, [
    body('status').optional().isIn(['present', 'absent', 'late', 'excused']).withMessage('Invalid attendance status'),
    body('notes').optional().trim()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const attendance = await Attendance.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        ).populate('student', 'firstName lastName studentId');

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json({
            message: 'Attendance updated successfully',
            attendance
        });
    } catch (error) {
        console.error('Update attendance error:', error);
        res.status(500).json({ message: 'Server error updating attendance' });
    }
});

// Delete attendance record
router.delete('/:id', teacherAuth, async (req, res) => {
    try {
        const attendance = await Attendance.findByIdAndDelete(req.params.id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        res.json({
            message: 'Attendance record deleted successfully',
            attendance
        });
    } catch (error) {
        console.error('Delete attendance error:', error);
        res.status(500).json({ message: 'Server error deleting attendance record' });
    }
});

// Get subjects list
router.get('/subjects/list', teacherAuth, async (req, res) => {
    try {
        const subjects = await Attendance.distinct('subject');
        res.json({ subjects });
    } catch (error) {
        console.error('Get subjects error:', error);
        res.status(500).json({ message: 'Server error fetching subjects' });
    }
});

module.exports = router;
