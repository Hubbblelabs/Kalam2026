import { FastifyRequest, FastifyReply } from 'fastify';
import Cart from '../models/cart.model.js';
import Event from '../models/event.model.js';

interface AuthRequest extends FastifyRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export const cartController = {
  // Get user's cart
  async getCart(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;

      let cart = await Cart.findOne({ user: userId }).populate('items.event');

      if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
      }

      return reply.status(200).send({
        success: true,
        data: cart,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to fetch cart' },
      });
    }
  },

  // Add item to cart
  async addToCart(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;
      const { eventId } = request.body as { eventId: string };

      // Check if event exists
      const event = await Event.findById(eventId);
      if (!event) {
        return reply.status(404).send({
          success: false,
          error: { message: 'Event not found' },
        });
      }

      // Find or create cart
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        cart = await Cart.create({ user: userId, items: [] });
      }

      // Check if event already in cart
      const existingItem = cart.items.find(
        (item) => item.event.toString() === eventId
      );

      if (existingItem) {
        return reply.status(400).send({
          success: false,
          error: { message: 'Event already in cart' },
        });
      }

      // Add item to cart
      cart.items.push({
        event: eventId as any,
        addedAt: new Date(),
      });

      await cart.save();
      await cart.populate('items.event');

      return reply.status(200).send({
        success: true,
        data: cart,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to add item to cart' },
      });
    }
  },

  // Remove item from cart
  async removeFromCart(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;
      const { eventId } = request.params as { eventId: string };

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return reply.status(404).send({
          success: false,
          error: { message: 'Cart not found' },
        });
      }

      // Remove item
      cart.items = cart.items.filter(
        (item) => item.event.toString() !== eventId
      );

      await cart.save();
      await cart.populate('items.event');

      return reply.status(200).send({
        success: true,
        data: cart,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to remove item from cart' },
      });
    }
  },

  // Clear cart
  async clearCart(request: AuthRequest, reply: FastifyReply) {
    try {
      const userId = request.user?.userId;

      const cart = await Cart.findOne({ user: userId });

      if (!cart) {
        return reply.status(404).send({
          success: false,
          error: { message: 'Cart not found' },
        });
      }

      cart.items = [];
      await cart.save();

      return reply.status(200).send({
        success: true,
        data: cart,
      });
    } catch (error) {
      return reply.status(500).send({
        success: false,
        error: { message: 'Failed to clear cart' },
      });
    }
  },
};
