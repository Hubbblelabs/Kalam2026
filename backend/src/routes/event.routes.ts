import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { authenticate, isAdmin } from '../middlewares/auth.middleware.js';

const createEventSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string(),
  category: z.string(),
  date: z.string().datetime(),
  venue: z.string(),
  maxParticipants: z.number().positive(),
  registrationFee: z.number().min(0),
  rules: z.array(z.string()).optional(),
});

export const eventRoutes: FastifyPluginAsync = async (app) => {
  // Get all events (public)
  app.get('/', async () => {
    // TODO: Implement get all events
    return {
      success: true,
      data: [],
    };
  });

  // Get event by ID (public)
  app.get('/:id', async (request) => {
    const { id } = request.params as { id: string };
    // TODO: Implement get event by ID
    return {
      success: true,
      data: { id },
    };
  });

  // Create event (admin only)
  app.post('/', { preHandler: [authenticate, isAdmin] }, async (request, reply) => {
    const body = createEventSchema.parse(request.body);
    // TODO: Implement create event
    return reply.status(201).send({
      success: true,
      data: body,
    });
  });

  // Update event (admin only)
  app.patch('/:id', { preHandler: [authenticate, isAdmin] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: Implement update event
    return reply.send({
      success: true,
      message: `Event ${id} updated`,
    });
  });

  // Delete event (admin only)
  app.delete('/:id', { preHandler: [authenticate, isAdmin] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: Implement delete event
    return reply.send({
      success: true,
      message: `Event ${id} deleted`,
    });
  });

  // Register for event
  app.post('/:id/register', { preHandler: [authenticate] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    // TODO: Implement event registration
    return reply.status(201).send({
      success: true,
      message: `Registered for event ${id}`,
    });
  });
};
