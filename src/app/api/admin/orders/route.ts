import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/order.model';
import {
  requirePermission,
  handleAdminError,
  parsePagination,
  buildSort,
  paginatedResponse,
} from '@/lib/admin-auth';

// GET /api/admin/orders
export async function GET(request: NextRequest) {
  try {
    await requirePermission('orders', 'read');
    await connectDB();

    const { page, limit, skip, sort, search } = parsePagination(
      request.nextUrl.searchParams
    );

    const filter: any = {};

    const status = request.nextUrl.searchParams.get('status');
    if (status) filter.status = status;

    const userId = request.nextUrl.searchParams.get('user');
    if (userId) filter.user = userId;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate('user', 'name email')
        .populate('items.event', 'name slug')
        .populate('payment', 'amount status gateway')
        .sort(buildSort(sort))
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(filter),
    ]);

    const data = orders.map((o: any) => ({
      id: o._id.toString(),
      orderNumber: `ORD-${o._id.toString().slice(-8).toUpperCase()}`,
      user: o.user
        ? { id: o.user._id.toString(), name: o.user.name, email: o.user.email }
        : null,
      items: o.items.map((item: any) => ({
        event: item.event
          ? { id: item.event._id.toString(), name: item.event.name, slug: item.event.slug }
          : null,
        amount: item.amount,
      })),
      entryFee: o.entryFee,
      totalAmount: o.totalAmount,
      status: o.status,
      payment: o.payment
        ? { id: o.payment._id.toString(), amount: o.payment.amount, status: o.payment.status, gateway: o.payment.gateway }
        : null,
      createdAt: o.createdAt,
    }));

    return NextResponse.json(paginatedResponse(data, total, page, limit));
  } catch (error) {
    return handleAdminError(error);
  }
}
