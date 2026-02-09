import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/order.model';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';
import { z } from 'zod';

const updateOrderSchema = z.object({
  status: z.enum(['CREATED', 'PAID', 'FAILED', 'CANCELLED']).optional(),
});

// GET /api/admin/orders/[id]
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('orders', 'read');
    await connectDB();

    const { id } = await params;
    const order = await Order.findById(id)
      .populate('user', 'name email phone')
      .populate('items.event', 'name slug venue fee')
      .populate('payment')
      .lean();

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: (order as any)._id.toString(),
        orderNumber: `ORD-${(order as any)._id.toString().slice(-8).toUpperCase()}`,
        user: (order as any).user,
        items: (order as any).items,
        entryFee: (order as any).entryFee,
        totalAmount: (order as any).totalAmount,
        status: (order as any).status,
        payment: (order as any).payment,
        createdAt: (order as any).createdAt,
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}

// PATCH /api/admin/orders/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requirePermission('orders', 'update');
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const data = updateOrderSchema.parse(body);

    const order = await Order.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: { id: order._id.toString(), status: order.status },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}
