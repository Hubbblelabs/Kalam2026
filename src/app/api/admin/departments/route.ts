import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Department } from '@/models/department.model';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  paginatedResponse,
} from '@/lib/admin-auth';
import { z } from 'zod';

const createDepartmentSchema = z.object({
  code: z.number().int().positive(),
  name: z.string().min(2).max(200),
  category: z.string().min(1).max(100),
});

// GET /api/admin/departments
export async function GET(request: NextRequest) {
  try {
    await requirePermission('departments', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const filter: any = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    const category = request.nextUrl.searchParams.get('category');
    if (category) filter.category = category;

    const [departments, total] = await Promise.all([
      Department.find(filter)
        .sort(buildSort(sort || 'code'))
        .skip(skip)
        .limit(limit)
        .lean(),
      Department.countDocuments(filter),
    ]);

    const data = departments.map((d: any) => ({
      id: d._id.toString(),
      code: d.code,
      name: d.name,
      category: d.category,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}

// POST /api/admin/departments
export async function POST(request: NextRequest) {
  try {
    await requirePermission('departments', 'create');
    await connectDB();

    const body = await request.json();
    const data = createDepartmentSchema.parse(body);

    const existing = await Department.findOne({ code: data.code });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Department with this code already exists' },
        { status: 400 }
      );
    }

    const department = await Department.create(data);

    return NextResponse.json({
      success: true,
      data: {
        id: department._id.toString(),
        code: department.code,
        name: department.name,
        category: department.category,
      },
    }, { status: 201 });
  } catch (error) {
    return handleAdminError(error);
  }
}
