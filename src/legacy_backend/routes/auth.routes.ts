import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { authController } from '../controllers/auth.controller.js';

const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  phone: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const refreshSchema = z.object({
  refreshToken: z.string(),
});

export const authRoutes: FastifyPluginAsync = async (app) => {
  // Register
  app.post('/register', async (request, reply) => {
    const body = registerSchema.parse(request.body);
    const result = await authController.register(body);
    return reply.status(201).send(result);
  });

  // Login
  app.post('/login', async (request, reply) => {
    const body = loginSchema.parse(request.body);
    const result = await authController.login(body);
    return reply.send(result);
  });

  // Refresh Token
  app.post('/refresh', async (request, reply) => {
    const body = refreshSchema.parse(request.body);
    const result = await authController.refreshToken(body.refreshToken);
    return reply.send(result);
  });

  // Logout
  app.post('/logout', async (request, reply) => {
    // Invalidate refresh token (implementation depends on your token strategy)
    return reply.send({ success: true, message: 'Logged out successfully' });
  });
};
