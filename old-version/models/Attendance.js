const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'late', 'excused'],
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        trim: true
    },
    markedAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index to prevent duplicate attendance records
attendanceSchema.index({ student: 1, date: 1, subject: 1 }, { unique: true });

// Static method to get attendance statistics
attendanceSchema.statics.getStatistics = async function(filters = {}) {
    const matchStage = {};
    
    if (filters.department) matchStage.department = filters.department;
    if (filters.semester) matchStage.semester = filters.semester;
    if (filters.startDate) matchStage.date = { $gte: new Date(filters.startDate) };
    if (filters.endDate) matchStage.date = { ...matchStage.date, $lte: new Date(filters.endDate) };
    
    const stats = await this.aggregate([
        { $match: matchStage },
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);
    
    const result = {
        total: 0,
        present: 0,
        absent: 0,
        late: 0,
        excused: 0
    };
    
    stats.forEach(stat => {
        result[stat._id] = stat.count;
        result.total += stat.count;
    });
    
    return result;
};

module.exports = mongoose.model('Attendance', attendanceSchema);
