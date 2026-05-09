import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import { getAuthUser } from '@/lib/auth';
import moment from 'moment';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const department = searchParams.get('department');
    const semester = searchParams.get('semester');

    // Get total students count
    const studentFilter: any = { isActive: true };
    if (department) studentFilter.department = department;
    if (semester) studentFilter.semester = parseInt(semester);

    const totalStudents = await Student.countDocuments(studentFilter);

    // Get today's attendance statistics
    const today = moment().startOf('day');
    const todayFilter: any = {
      date: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').toDate()
      }
    };
    if (department) todayFilter.department = department;
    if (semester) todayFilter.semester = parseInt(semester);

    const todayStats = await (Attendance as any).getStatistics(todayFilter);

    // Get this week's attendance statistics
    const weekStart = moment().startOf('isoWeek');
    const weekFilter: any = {
      date: {
        $gte: weekStart.toDate(),
        $lte: moment().endOf('day').toDate()
      }
    };
    if (department) weekFilter.department = department;
    if (semester) weekFilter.semester = parseInt(semester);

    const weekStats = await (Attendance as any).getStatistics(weekFilter);

    // Get this month's attendance statistics
    const monthStart = moment().startOf('month');
    const monthFilter: any = {
      date: {
        $gte: monthStart.toDate(),
        $lte: moment().endOf('day').toDate()
      }
    };
    if (department) monthFilter.department = department;
    if (semester) monthFilter.semester = parseInt(semester);

    const monthStats = await (Attendance as any).getStatistics(monthFilter);

    return NextResponse.json({
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
  } catch (error: any) {
    console.error('Get dashboard overview error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
