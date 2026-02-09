import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Department } from '@/models/department.model';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updateDepartmentSchema = z.object({
  code: z.number().int().positive().optional(),
  name: z.string().min(2).max(200).optional(),
  category: z.string().min(1).max(100).optional(),
});

// GET /api/admin/departments/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('departments', 'read');
    await connectDB();

    const { id } = await params;
    const dept = await Department.findById(id).lean();
    if (!dept) {
      return NextResponse.json({ success: false, error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (dept as any)._id.toString(),
        code: (dept as any).code,
        name: (dept as any).name,
        category: (dept as any).category,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/departments/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('departments', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateDepartmentSchema.parse(body);

    const dept = await Department.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!dept) {
      return NextResponse.json({ success: false, error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: dept._id.toString(),
        code: dept.code,
        name: dept.name,
        category: dept.category,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// DELETE /api/admin/departments/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('departments', 'delete');
    await connectDB();

    const { id } = await params;
    const dept = await Department.findByIdAndDelete(id);
    if (!dept) {
      return NextResponse.json({ success: false, error: 'Department not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Department deleted' });
  } catch (error) {
    return handleAdminError(error);
  }
}
