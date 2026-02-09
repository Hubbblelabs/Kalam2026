import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/admin.model';
import { hashPassword } from '@/lib/auth';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  paginatedResponse,
} from '@/lib/admin-auth';
import { z } from 'zod';

const createAdminSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  role: z.enum(['superadmin', 'event_manager', 'department_manager']),
  department: z.string().optional(),
  assignedEvents: z.array(z.string()).optional(),
});

// GET /api/admin/admins
export async function GET(request: NextRequest) {
  try {
    await requirePermission('admins', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const role = request.nextUrl.searchParams.get('role');
    if (role) filter.role = role;

    const [admins, total] = await Promise.all([
      Admin.find(filter)
        .select('-passwordHash')
        .populate('department', 'name code')
        .sort(buildSort(sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      Admin.countDocuments(filter),
    ]);

    const data = admins.map((a: any) => ({
      id: a._id.toString(),
      name: a.name,
      email: a.email,
      phone: a.phone,
      role: a.role,
      department: a.department
        ? { id: a.department._id.toString(), name: a.department.name, code: a.department.code }
        : null,
      assignedEvents: a.assignedEvents?.map((e: any) => e.toString()) || [],
      createdAt: a.createdAt,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}

// POST /api/admin/admins
export async function POST(request: NextRequest) {
  try {
    await requirePermission('admins', 'create');
    await connectDB();

    const body = await request.json();
    const data = createAdminSchema.parse(body);

    const existing = await Admin.findOne({ email: data.email });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Admin with this email already exists' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(data.password);
    const admin = await Admin.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      passwordHash,
      role: data.role,
      department: data.department || null,
      assignedEvents: data.assignedEvents || [],
    });

    return NextResponse.json({
      success: true,
      data: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    }, { status: 201 });
  } catch (error) {
    return handleAdminError(error);
  }
}
