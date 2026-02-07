import { FastifyInstance } from 'fastify';
import { orderController } from '../controllers/order.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { z } from 'zod';

const confirmOrderSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  paymentId: z.string().min(1, 'Payment ID is required'),
});

export async function orderRoutes(app: FastifyInstance) {
  // Create order from cart
  app.post(
    '/',
    { preHandler: [authMiddleware] },
    orderController.createOrder
  );

  // Get all user orders
  app.get(
    '/',
    { preHandler: [authMiddleware] },
    orderController.getUserOrders
  );

  // Get single order
  app.get(
    '/:orderId',
    { preHandler: [authMiddleware] },
    orderController.getOrder
  );

  // Cancel order
  app.patch(
    '/:orderId/cancel',
    { preHandler: [authMiddleware] },
    orderController.cancelOrder
  );

  // Confirm order (after payment)
  app.post(
    '/confirm',
    { preHandler: [authMiddleware] },
    async (request, reply) => {
      const body = confirmOrderSchema.parse(request.body);
      request.body = body;
      return orderController.confirmOrder(request, reply);
    }
  );
}
