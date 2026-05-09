import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }

  try {
    await dbConnect();
    
    // Force recreate demo user to ensure password is 'demo'
    await User.deleteOne({ email: 'teacher@demo.com' });

    // Create demo user
    const user = new User({
      name: 'Demo Teacher',
      email: 'teacher@demo.com',
      password: 'password123', // This will be hashed by the model pre-save hook
      department: 'Computer Science',
      role: 'teacher'
    });

    await user.save();

    return NextResponse.json({ 
      message: 'Demo user created successfully', 
      credentials: { email: 'teacher@demo.com', password: 'password123' } 
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}
