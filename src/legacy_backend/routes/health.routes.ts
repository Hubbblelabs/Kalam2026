import { FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (app) => {
  app.get('/health', async () => {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  app.get('/api/health', async () => {
    return {
      status: 'ok',
      service: 'kalam-backend',
      timestamp: new Date().toISOString(),
    };
  });
};
