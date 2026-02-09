import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/order.model';
import { requireAuth } from '@/lib/session';

// GET /api/orders/[orderId] - Get single order
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const session = await requireAuth();
        await connectDB();

        const { orderId } = await params;

        const order = await Order.findOne({ _id: orderId, user: session.userId })
            .populate('items.event', 'title description date venue registrationFee');

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: order._id.toString(),
                orderNumber: `ORD-${order._id.toString().slice(-8).toUpperCase()}`,
                items: order.items.map((item: any) => ({
                    event: item.event
                        ? {
                              id: item.event._id?.toString(),
                              title: item.event.title,
                              description: item.event.description,
                              date: item.event.date,
                              venue: item.event.venue,
                          }
                        : null,
                    eventTitle: item.event?.title || 'Unknown Event',
                    eventDate: item.event?.date || '',
                    price: item.amount,
                })),
                totalAmount: order.totalAmount,
                status: order.status.toLowerCase(),
                createdAt: order.createdAt.toISOString(),
            },
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }
        console.error('Get order error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
