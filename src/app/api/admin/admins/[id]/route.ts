import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Admin } from '@/models/admin.model';
import { hashPassword } from '@/lib/auth';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updateAdminSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
  role: z.enum(['superadmin', 'event_manager', 'department_manager']).optional(),
  department: z.string().nullable().optional(),
  assignedEvents: z.array(z.string()).optional(),
});

// GET /api/admin/admins/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('admins', 'read');
    await connectDB();

    const { id } = await params;
    const admin = await Admin.findById(id)
      .select('-passwordHash')
      .populate('department', 'name code')
      .populate('assignedEvents', 'name slug')
      .lean();

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (admin as any)._id.toString(),
        name: (admin as any).name,
        email: (admin as any).email,
        phone: (admin as any).phone,
        role: (admin as any).role,
        department: (admin as any).department,
        assignedEvents: (admin as any).assignedEvents || [],
        createdAt: (admin as any).createdAt,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/admins/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requirePermission('admins', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateAdminSchema.parse(body);

    // Prevent non-superadmins from escalating roles
    if (data.role === 'superadmin' && ctx.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Cannot assign superadmin role' },
        { status: 403 }
      );
    }

    const updateData: any = { ...data };
    if (data.password) {
      updateData.passwordHash = await hashPassword(data.password);
      delete updateData.password;
    }

    const admin = await Admin.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-passwordHash');

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// DELETE /api/admin/admins/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await requirePermission('admins', 'delete');
    await connectDB();

    const { id } = await params;

    // Prevent self-deletion
    if (id === ctx.adminId) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Admin deleted' });
  } catch (error) {
    return handleAdminError(error);
  }
}
