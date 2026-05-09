import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const department = searchParams.get('department');
    const semester = searchParams.get('semester');

    const filter: any = {};
    if (department) filter.department = department;
    if (semester) filter.semester = parseInt(semester);

    const recentAttendance = await Attendance.find(filter)
      .populate('student', 'firstName lastName studentId rollNumber')
      .populate('teacher', 'name email')
      .sort({ markedAt: -1 })
      .limit(limit);

    return NextResponse.json({
      recentAttendance,
      filters: {
        department,
        semester
      }
    });
  } catch (error: any) {
    console.error('Get recent activity error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
