import { FastifyRequest, FastifyReply } from 'fastify';
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Event from '../models/event.model.js';
import Payment from '../models/payment.model.js';
import Registration from '../models/registration.model.js';

interface AuthRequest extends FastifyRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

// Generate unique order number
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

export const orderController = {
  // Create order from cart
  async createOrder(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;

      // Get user's cart
      const cart = await Cart.findOne({ user: userId }).populate('items.event');

      if (!cart || cart.items.length === 0) {
        return reply.status(400).send({
          success: false,
          error: { message: 'Cart is empty' },
        });
      }

      // Calculate total and prepare order items
      let totalAmount = 0;
      const orderItems = [];

      for (const cartItem of cart.items) {
        const event = cartItem.event as any;
        totalAmount += event.registrationFee;

        orderItems.push({
          event: event._id,
          eventTitle: event.title,
          eventDate: event.date,
          price: event.registrationFee,
        });
      }

      // Create order
      const order = await Order.create({
        user: userId,
        orderNumber: generateOrderNumber(),
        items: orderItems,
        totalAmount,
        status: 'pending',
      });

      // Clear cart
      cart.items = [];
      await cart.save();

      // Populate order details
      await order.populate('items.event');

      return reply.status(201).send({
        success: true,
        data: order,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to create order' },
      });
    }
  },

  // Get all user orders
  async getUserOrders(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;

      const orders = await Order.find({ user: userId })
        .populate('items.event')
        .populate('payment')
        .sort({ createdAt: -1 });

      return reply.status(200).send({
        success: true,
        data: orders,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to fetch orders' },
      });
    }
  },

  // Get single order
  async getOrder(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;
      const { orderId } = request.params as { orderId: string };

      const order = await Order.findOne({ _id: orderId, user: userId })
        .populate('items.event')
        .populate('payment');

      if (!order) {
        return reply.status(404).send({
          success: false,
          error: { message: 'Order not found' },
        });
      }

      return reply.status(200).send({
        success: true,
        data: order,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to fetch order' },
      });
    }
  },

  // Cancel order
  async cancelOrder(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;
      const { orderId } = request.params as { orderId: string };

      const order = await Order.findOne({ _id: orderId, user: userId });

      if (!order) {
        return reply.status(404).send({
          success: false,
          error: { message: 'Order not found' },
        });
      }

      if (order.status === 'confirmed') {
        return reply.status(400).send({
          success: false,
          error: { message: 'Cannot cancel confirmed order' },
        });
      }

      order.status = 'cancelled';
      await order.save();

      return reply.status(200).send({
        success: true,
        data: order,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to cancel order' },
      });
    }
  },

  // Confirm order (after payment)
  async confirmOrder(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;
      const { orderId, paymentId } = request.body as {
        orderId: string;
        paymentId: string;
      };

      const order = await Order.findOne({ _id: orderId, user: userId });

      if (!order) {
        return reply.status(404).send({
          success: false,
          error: { message: 'Order not found' },
        });
      }

      // Verify payment
      const payment = await Payment.findById(paymentId);
      if (!payment || payment.status !== 'success') {
        return reply.status(400).send({
          success: false,
          error: { message: 'Payment not verified' },
        });
      }

      // Update order
      order.status = 'confirmed';
      order.payment = paymentId as any;
      await order.save();

      // Create registrations for each event
      for (const item of order.items) {
        await Registration.create({
          user: userId,
          event: item.event,
          payment: paymentId,
          status: 'confirmed',
        });
      }

      return reply.status(200).send({
        success: true,
        data: order,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to confirm order' },
      });
    }
  },
};
