import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Payment } from '@/models/payment.model';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updatePaymentSchema = z.object({
  status: z.enum(['CREATED', 'SUCCESS', 'FAILED', 'REFUNDED']).optional(),
  completedAt: z.string().optional(),
});

// GET /api/admin/payments/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('payments', 'read');
    await connectDB();

    const { id } = await params;
    const payment = await Payment.findById(id)
      .populate('user', 'name email phone')
      .populate('order', 'totalAmount status items')
      .lean();

    if (!payment) {
      return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (payment as any)._id.toString(),
        user: (payment as any).user,
        order: (payment as any).order,
        gateway: (payment as any).gateway,
        gatewayOrderId: (payment as any).gatewayOrderId,
        gatewayPaymentId: (payment as any).gatewayPaymentId,
        amount: (payment as any).amount,
        currency: (payment as any).currency,
        status: (payment as any).status,
        rawResponse: (payment as any).rawResponse,
        initiatedAt: (payment as any).initiatedAt,
        completedAt: (payment as any).completedAt,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/payments/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('payments', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updatePaymentSchema.parse(body);

    const updateData: any = { ...data };
    if (data.completedAt) {
      updateData.completedAt = new Date(data.completedAt);
    }

    const payment = await Payment.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!payment) {
      return NextResponse.json({ success: false, error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: payment._id.toString(), status: payment.status },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}
