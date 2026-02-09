import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Registration } from '@/models/registration.model';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updateRegistrationSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']).optional(),
  teamName: z.string().optional(),
  teamMembers: z.array(z.string()).optional(),
});

// GET /api/admin/registrations/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('registrations', 'read');
    await connectDB();

    const { id } = await params;
    const reg = await Registration.findById(id)
      .populate('user', 'name email phone college')
      .populate('event', 'name slug venue schedule fee')
      .populate('payment', 'amount status gatewayPaymentId')
      .lean();

    if (!reg) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (reg as any)._id.toString(),
        user: (reg as any).user,
        event: (reg as any).event,
        payment: (reg as any).payment,
        status: (reg as any).status,
        teamName: (reg as any).teamName,
        teamMembers: (reg as any).teamMembers,
        createdAt: (reg as any).createdAt,
        updatedAt: (reg as any).updatedAt,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/registrations/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('registrations', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateRegistrationSchema.parse(body);

    const reg = await Registration.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!reg) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: reg._id.toString(), status: reg.status },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// DELETE /api/admin/registrations/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('registrations', 'delete');
    await connectDB();

    const { id } = await params;
    const reg = await Registration.findByIdAndDelete(id);
    if (!reg) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Registration deleted' });
  } catch (error) {
    return handleAdminError(error);
  }
}
