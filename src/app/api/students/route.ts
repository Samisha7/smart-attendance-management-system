import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { getAuthUser } from '@/lib/auth';

// Register new student (POST)
export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const studentData = await req.json();

    // Check if student already exists
    const existingStudent = await Student.findOne({
      $or: [
        { studentId: studentData.studentId },
        { email: studentData.email },
        { rollNumber: studentData.rollNumber, department: studentData.department }
      ]
    });

    if (existingStudent) {
      return NextResponse.json({ 
        message: 'Student already exists with this ID, email, or roll number' 
      }, { status: 400 });
    }

    const student = new Student(studentData);
    await student.save();

    return NextResponse.json({
      message: 'Student registered successfully',
      student
    }, { status: 201 });
  } catch (error: any) {
    console.error('Student registration error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Get all students (GET)
export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const department = searchParams.get('department') || '';
    const semester = searchParams.get('semester') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const filter: any = { isActive: true };

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { rollNumber: { $regex: search, $options: 'i' } }
      ];
    }

    if (department) filter.department = department;
    if (semester) filter.semester = parseInt(semester);

    const sortOptions: any = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const skip = (page - 1) * limit;

    const students = await Student.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Student.countDocuments(filter);

    return NextResponse.json({
      students,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalStudents: total,
        limit
      }
    });
  } catch (error: any) {
    console.error('Get students error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
