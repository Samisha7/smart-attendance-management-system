import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import { getAuthUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    const subjects = await Attendance.distinct('subject');
    return NextResponse.json({ subjects });
  } catch (error: any) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
