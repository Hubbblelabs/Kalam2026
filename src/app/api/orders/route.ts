import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Order } from '@/models/order.model';
import { Cart } from '@/models/cart.model';
import { requireAuth } from '@/lib/session';

// GET /api/orders - Get user's orders
export async function GET() {
    try {
        const session = await requireAuth();
        await connectDB();

        const orders = await Order.find({ user: session.userId })
            .populate('items.event', 'title description date venue registrationFee')
            .sort({ createdAt: -1 });

        const formattedOrders = orders.map((order) => ({
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
        }));

        return NextResponse.json({
            success: true,
            data: formattedOrders,
        });
    } catch (error: any) {
        if (error.message === 'Unauthorized') {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 }
            );
        }
        console.error('Get orders error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/orders - Create order from cart
export async function POST() {
    try {
        const session = await requireAuth();
        await connectDB();

        const cart = await Cart.findOne({ user: session.userId }).populate('items.event');

        if (!cart || cart.items.length === 0) {
            return NextResponse.json(
                { success: false, error: 'Cart is empty' },
                { status: 400 }
            );
        }

        const order = await Order.create({
            user: session.userId,
            items: cart.items.map((item: any) => ({
                event: item.event._id || item.event,
                amount: item.price,
            })),
            totalAmount: cart.totalAmount,
            status: 'CREATED',
        });

        // Clear the cart after creating order
        cart.items = [];
        cart.totalAmount = 0;
        await cart.save();

        return NextResponse.json({
            success: true,
            data: {
                id: order._id.toString(),
                orderNumber: `ORD-${order._id.toString().slice(-8).toUpperCase()}`,
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
        console.error('Create order error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
