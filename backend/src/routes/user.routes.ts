import { FastifyPluginAsync } from 'fastify';
import { authenticate } from '../middlewares/auth.middleware.js';

export const userRoutes: FastifyPluginAsync = async (app) => {
  // Get current user profile
  app.get('/me', { preHandler: [authenticate] }, async (request) => {
    return {
      success: true,
      data: request.user,
    };
  });

  // Update profile
  app.patch('/me', { preHandler: [authenticate] }, async (request, reply) => {
    // TODO: Implement profile update
    return reply.send({ success: true, message: 'Profile updated' });
  });

  // Get user registrations
  app.get('/me/registrations', { preHandler: [authenticate] }, async (request) => {
    // TODO: Implement get user registrations
    return {
      success: true,
      data: [],
    };
  });
};
