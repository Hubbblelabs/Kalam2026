import { FastifyInstance } from 'fastify';
import { cartController } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { z } from 'zod';

const addToCartSchema = z.object({
  eventId: z.string().min(1, 'Event ID is required'),
});

export async function cartRoutes(app: FastifyInstance) {
  // Get user's cart
  app.get(
    '/',
    { preHandler: [authMiddleware] },
    cartController.getCart
  );

  // Add item to cart
  app.post(
    '/',
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const body = addToCartSchema.parse(request.body);
      request.body = body;
      return cartController.addToCart(request, reply);
    }
  );

  // Remove item from cart
  app.delete(
    '/:eventId',
    { preHandler: [authMiddleware] },
    cartController.removeFromCart
  );

  // Clear cart
  app.delete(
    '/',
    { preHandler: [authMiddleware] },
    cartController.clearCart
  );
}
