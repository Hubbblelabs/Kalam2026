import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/order.model';
import { requireAuth } from '@/lib/session';

// PATCH /api/orders/[orderId]/cancel - Cancel an order
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ orderId: string }> }
) {
    try {
        const session = await requireAuth();
        await connectDB();

        const { orderId } = await params;

        const order = await Order.findOne({ _id: orderId, user: session.userId });

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        if (order.status === 'CANCELLED') {
            return NextResponse.json(
                { success: false, error: 'Order is already cancelled' },
                { status: 400 }
            );
        }

        if (order.status === 'PAID') {
            return NextResponse.json(
                { success: false, error: 'Cannot cancel a paid order. Please request a refund.' },
                { status: 400 }
            );
        }

        order.status = 'CANCELLED';
        await order.save();

        return NextResponse.json({
            success: true,
            data: {
                id: order._id.toString(),
                status: order.status.toLowerCase(),
            },
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }
        console.error('Cancel order error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
