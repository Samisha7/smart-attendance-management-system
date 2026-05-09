import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from './mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const signToken = (payload: any) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const getAuthUser = async (req: NextRequest) => {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return null;

  const decoded: any = verifyToken(token);
  if (!decoded) return null;

  await dbConnect();
  const user = await User.findById(decoded.id).select('-password');
  return user;
};

export const authMiddleware = async (req: NextRequest) => {
  const user = await getAuthUser(req);
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  return user;
};
