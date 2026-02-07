import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { authenticate } from '../middlewares/auth.middleware.js';
import { paymentService } from '../services/payment.service.js';

const initiatePaymentSchema = z.object({
  eventId: z.string(),
  amount: z.number().positive(),
});

export const paymentRoutes: FastifyPluginAsync = async (app) => {
  // Initiate payment
  app.post('/initiate', { preHandler: [authenticate] }, async (request, reply) => {
    const body = initiatePaymentSchema.parse(request.body);
    const userId = request.user?.id;

    if (!userId) {
      return reply.status(401).send({ success: false, message: 'Unauthorized' });
    }

    const result = await paymentService.initiatePayment({
      userId,
      eventId: body.eventId,
      amount: body.amount,
    });

    return reply.send({
      success: true,
      data: result,
    });
  });

  // Payment callback (PhonePe webhook)
  app.post('/callback', async (request, reply) => {
    const body = request.body as Record<string, unknown>;
    // Verify callback signature
    const isValid = await paymentService.verifyCallback(body, request.headers as Record<string, unknown>);

    if (!isValid) {
      return reply.status(400).send({ success: false, message: 'Invalid callback' });
    }

    // Process payment result
    await paymentService.processCallback(body);

    return reply.send({ success: true });
  });

  // Check payment status
  app.get('/status/:transactionId', { preHandler: [authenticate] }, async (request) => {
    const { transactionId } = request.params as { transactionId: string };

    const status = await paymentService.checkStatus(transactionId);

    return {
      success: true,
      data: status,
    };
  });
};
