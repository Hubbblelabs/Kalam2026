import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user.model';
import { hashPassword } from '@/lib/auth';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  college: z.string().optional(),
  department: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  hasPaidEntryFee: z.boolean().optional(),
  password: z.string().min(8).optional(),
});

// GET /api/admin/users/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('users', 'read');
    await connectDB();

    const { id } = await params;
    const user = await User.findById(id).select('-passwordHash').lean();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (user as any)._id.toString(),
        name: (user as any).name,
        email: (user as any).email,
        phone: (user as any).phone,
        college: (user as any).college,
        department: (user as any).department,
        role: (user as any).role,
        hasPaidEntryFee: (user as any).hasPaidEntryFee,
        createdAt: (user as any).createdAt,
        updatedAt: (user as any).updatedAt,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/users/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('users', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateUserSchema.parse(body);

    const updateData: any = { ...data };
    if (data.password) {
      updateData.passwordHash = await hashPassword(data.password);
      delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select('-passwordHash');

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// DELETE /api/admin/users/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('users', 'delete');
    await connectDB();

    const { id } = await params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error) {
    return handleAdminError(error);
  }
}
