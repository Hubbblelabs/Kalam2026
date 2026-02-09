import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Payment } from '@/models/payment.model';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  paginatedResponse,
} from '@/lib/admin-auth';

// GET /api/admin/payments
export async function GET(request: NextRequest) {
  try {
    await requirePermission('payments', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const filter: any = {};

    const status = request.nextUrl.searchParams.get('status');
    if (status) filter.status = status;

    const gateway = request.nextUrl.searchParams.get('gateway');
    if (gateway) filter.gateway = gateway;

    if (search) {
      filter.$or = [
        { gatewayOrderId: { $regex: search, $options: 'i' } },
        { gatewayPaymentId: { $regex: search, $options: 'i' } },
      ];
    }

    const [payments, total] = await Promise.all([
      Payment.find(filter)
        .populate('user', 'name email')
        .populate('order', 'totalAmount status')
        .sort(buildSort(sort || '-initiatedAt'))
        .skip(skip)
        .limit(limit)
        .lean(),
      Payment.countDocuments(filter),
    ]);

    const data = payments.map((p: any) => ({
      id: p._id.toString(),
      user: p.user
        ? { id: p.user._id.toString(), name: p.user.name, email: p.user.email }
        : null,
      order: p.order
        ? { id: p.order._id.toString(), totalAmount: p.order.totalAmount, status: p.order.status }
        : null,
      gateway: p.gateway,
      gatewayOrderId: p.gatewayOrderId,
      gatewayPaymentId: p.gatewayPaymentId,
      amount: p.amount,
      currency: p.currency,
      status: p.status,
      initiatedAt: p.initiatedAt,
      completedAt: p.completedAt,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}
