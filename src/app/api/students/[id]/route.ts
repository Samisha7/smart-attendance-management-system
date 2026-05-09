import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Student from '@/models/Student';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const student = await Student.findById(params.id);
    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });

    return NextResponse.json({ student });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();
    const student = await Student.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });

    return NextResponse.json({ message: 'Student updated successfully', student });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthUser(req);
    if (!user || (user.role !== 'teacher' && user.role !== 'admin')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const student = await Student.findByIdAndUpdate(
      params.id,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );

    if (!student) return NextResponse.json({ message: 'Student not found' }, { status: 404 });

    return NextResponse.json({ message: 'Student deleted successfully', student });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
