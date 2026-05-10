import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Student from '@/models/Student';
import { getAuthUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const { date, subject, department, semester, attendees } = await req.json();

    // Validate that all students exist
    const studentIds = attendees.map((a: any) => a.studentId);
    const students = await Student.find({ 
      _id: { $in: studentIds },
      department,
      semester,
      isActive: true 
    });

    if (students.length !== studentIds.length) {
      return NextResponse.json({ 
        message: 'Some students not found or not in the specified department/semester' 
      }, { status: 400 });
    }

    const attendanceRecords = [];
    const attendanceErrors = [];

    for (const attendee of attendees) {
      try {
        const attendance = new Attendance({
          student: attendee.studentId,
          teacher: user._id,
          date: new Date(date),
          subject,
          department,
          semester,
          status: attendee.status,
          notes: attendee.notes || ''
        });

        await attendance.save();
        attendanceRecords.push(attendance);
      } catch (error: any) {
        if (error.code === 11000) {
          attendanceErrors.push(`Attendance already marked for student ${attendee.studentId}`);
        } else {
          attendanceErrors.push(`Error marking attendance for student ${attendee.studentId}: ${error.message}`);
        }
      }
    }

    return NextResponse.json({
      message: `Attendance marked for ${attendanceRecords.length} students`,
      attendanceRecords,
      errors: attendanceErrors.length > 0 ? attendanceErrors : undefined
    }, { status: 201 });
  } catch (error: any) {
    console.error('Mark attendance error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
