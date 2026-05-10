import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import { getAuthUser } from '@/lib/auth';
import moment from 'moment';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const date = searchParams.get('date');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const subject = searchParams.get('subject');
    const department = searchParams.get('department');
    const semester = searchParams.get('semester');
    const status = searchParams.get('status');
    const studentId = searchParams.get('studentId');
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const filter: any = {};

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
    }

    if (subject) filter.subject = subject;
    if (department) filter.department = department;
    if (semester) filter.semester = parseInt(semester);
    if (status) filter.status = status;
    if (studentId) filter.student = studentId;

    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const attendance = await Attendance.find(filter)
      .populate('student', 'firstName lastName studentId rollNumber email')
      .populate('teacher', 'name email')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Attendance.countDocuments(filter);

    return NextResponse.json({
      attendance,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit
      }
    });
  } catch (error: any) {
    console.error('Get attendance error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
