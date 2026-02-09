import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user.model';
import { hashPassword } from '@/lib/auth';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  paginatedResponse,
} from '@/lib/admin-auth';
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  college: z.string().optional(),
  department: z.string().optional(),
  role: z.enum(['user', 'admin']).default('user'),
  hasPaidEntryFee: z.boolean().default(false),
});

// GET /api/admin/users
export async function GET(request: NextRequest) {
  try {
    await requirePermission('users', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
      ];
    }

    const role = request.nextUrl.searchParams.get('role');
    if (role) filter.role = role;

    const [users, total] = await Promise.all([
      User.find(filter)
        .select('-passwordHash')
        .sort(buildSort(sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    const data = users.map((u: any) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      phone: u.phone,
      college: u.college,
      department: u.department,
      role: u.role,
      hasPaidEntryFee: u.hasPaidEntryFee,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}

// POST /api/admin/users
export async function POST(request: NextRequest) {
  try {
    await requirePermission('users', 'create');
    await connectDB();

    const body = await request.json();
    const data = createUserSchema.parse(body);

    const existing = await User.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(data.password);
    const user = await User.create({
      ...data,
      passwordHash,
      password: undefined,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, { status: 201 });
  } catch (error) {
    return handleAdminError(error);
  }
}
