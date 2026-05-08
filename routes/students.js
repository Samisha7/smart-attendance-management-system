const express = require('express');
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');
const { teacherAuth } = require('../middleware/auth');

const router = express.Router();

// Register new student
router.post('/', teacherAuth, [
    body('studentId').trim().notEmpty().withMessage('Student ID is required'),
    body('firstName').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
    body('lastName').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('department').trim().notEmpty().withMessage('Department is required'),
    body('semester').isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
    body('rollNumber').trim().notEmpty().withMessage('Roll number is required'),
    body('dateOfBirth').isISO8601().withMessage('Valid date of birth required'),
    body('address').trim().notEmpty().withMessage('Address is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const studentData = req.body;

        // Check if student already exists
        const existingStudent = await Student.findOne({
            $or: [
                { studentId: studentData.studentId },
                { email: studentData.email },
                { rollNumber: studentData.rollNumber, department: studentData.department }
            ]
        });

        if (existingStudent) {
            return res.status(400).json({ 
                message: 'Student already exists with this ID, email, or roll number' 
            });
        }

        // Create new student
        const student = new Student(studentData);
        await student.save();

        res.status(201).json({
            message: 'Student registered successfully',
            student
        });
    } catch (error) {
        console.error('Student registration error:', error);
        res.status(500).json({ message: 'Server error during student registration' });
    }
});

// Get all students with search and filter
router.get('/', teacherAuth, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search = '',
            department = '',
            semester = '',
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        // Build filter query
        const filter = { isActive: true };

        if (search) {
            filter.$or = [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
                { studentId: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { rollNumber: { $regex: search, $options: 'i' } }
            ];
        }

        if (department) {
            filter.department = department;
        }

        if (semester) {
            filter.semester = parseInt(semester);
        }

        // Build sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const students = await Student.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Student.countDocuments(filter);

        res.json({
            students,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalStudents: total,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({ message: 'Server error fetching students' });
    }
});

// Get student by ID
router.get('/:id', teacherAuth, async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({ student });
    } catch (error) {
        console.error('Get student error:', error);
        res.status(500).json({ message: 'Server error fetching student' });
    }
});

// Update student
router.put('/:id', teacherAuth, [
    body('firstName').optional().trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
    body('lastName').optional().trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
    body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
    body('phone').optional().trim().notEmpty().withMessage('Phone number is required'),
    body('department').optional().trim().notEmpty().withMessage('Department is required'),
    body('semester').optional().isInt({ min: 1, max: 8 }).withMessage('Semester must be between 1 and 8'),
    body('rollNumber').optional().trim().notEmpty().withMessage('Roll number is required'),
    body('address').optional().trim().notEmpty().withMessage('Address is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({
            message: 'Student updated successfully',
            student
        });
    } catch (error) {
        console.error('Update student error:', error);
        res.status(500).json({ message: 'Server error updating student' });
    }
});

// Delete student (soft delete)
router.delete('/:id', teacherAuth, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { isActive: false, updatedAt: Date.now() },
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.json({
            message: 'Student deleted successfully',
            student
        });
    } catch (error) {
        console.error('Delete student error:', error);
        res.status(500).json({ message: 'Server error deleting student' });
    }
});

// Get departments list
router.get('/departments/list', teacherAuth, async (req, res) => {
    try {
        const departments = await Student.distinct('department', { isActive: true });
        res.json({ departments });
    } catch (error) {
        console.error('Get departments error:', error);
        res.status(500).json({ message: 'Server error fetching departments' });
    }
});

module.exports = router;
