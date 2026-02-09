import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/user.model';
import { Event } from '@/models/event.model';
import { Registration } from '@/models/registration.model';
import { Order } from '@/models/order.model';
import { Payment } from '@/models/payment.model';
import { Department } from '@/models/department.model';
import { requirePermission, handleAdminError } from '@/lib/admin-auth';

export async function GET() {
  try {
    const ctx = await requirePermission('dashboard', 'read');
    await connectDB();

    const scopeFilter =
      ctx.role === 'superadmin'
        ? {}
        : ctx.role === 'department_manager' && ctx.department
          ? { department: ctx.department }
          : {};

    const [
      totalUsers,
      totalEvents,
      totalRegistrations,
      totalOrders,
      revenueAgg,
      totalDepartments,
      recentRegistrations,
      ordersByStatus,
      paymentsByStatus,
    ] = await Promise.all([
      ctx.role === 'superadmin' ? User.countDocuments() : 0,
      Event.countDocuments(scopeFilter),
      Registration.countDocuments(),
      Order.countDocuments(),
      Payment.aggregate([
        { $match: { status: 'SUCCESS' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Department.countDocuments(),
      Registration.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name email')
        .populate('event', 'name')
        .lean(),
      Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Payment.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalEvents,
        totalRegistrations,
        totalOrders,
        totalRevenue: revenueAgg[0]?.total || 0,
        totalDepartments,
        recentRegistrations: recentRegistrations.map((r: any) => ({
          id: r._id.toString(),
          userName: r.user?.name || 'Unknown',
          userEmail: r.user?.email || '',
          eventName: r.event?.name || 'Unknown',
          status: r.status,
          createdAt: r.createdAt,
        })),
        ordersByStatus: ordersByStatus.reduce(
          (acc: any, s: any) => ({ ...acc, [s._id]: s.count }),
          {}
        ),
        paymentsByStatus: paymentsByStatus.reduce(
          (acc: any, s: any) => ({ ...acc, [s._id]: s.count }),
          {}
        ),
      },
    });
  } catch (error) {
    return handleAdminError(error);
  }
}
