import Fastify, { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import { config } from './config/env.js';
import { connectDB } from './config/database.js';
import { authRoutes } from './routes/auth.routes.js';
import { userRoutes } from './routes/user.routes.js';
import { eventRoutes } from './routes/event.routes.js';
import { paymentRoutes } from './routes/payment.routes.js';
import { healthRoutes } from './routes/health.routes.js';

const app = Fastify({
  logger: {
    level: config.LOG_LEVEL,
    transport:
      config.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname',
            },
          }
        : undefined,
  },
});

// ===========================================
// Plugins
// ===========================================
await app.register(cors, {
  origin: config.CORS_ORIGIN,
  credentials: true,
});

await app.register(helmet, {
  contentSecurityPolicy: config.NODE_ENV === 'production',
});

await app.register(rateLimit, {
  max: config.RATE_LIMIT_MAX,
  timeWindow: config.RATE_LIMIT_WINDOW_MS,
});

await app.register(sensible);

// ===========================================
// Routes
// ===========================================
await app.register(healthRoutes);
await app.register(authRoutes, { prefix: '/api/auth' });
await app.register(userRoutes, { prefix: '/api/users' });
await app.register(eventRoutes, { prefix: '/api/events' });
await app.register(paymentRoutes, { prefix: '/api/payments' });

// ===========================================
// Error Handler
// ===========================================
app.setErrorHandler((error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  app.log.error(error);

  const statusCode = error.statusCode ?? 500;
  const message = statusCode === 500 ? 'Internal Server Error' : error.message;

  reply.status(statusCode).send({
    success: false,
    error: {
      message,
      ...(config.NODE_ENV === 'development' && { stack: error.stack }),
    },
  });
});

// ===========================================
// Start Server
// ===========================================
const start = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    app.log.info('Connected to MongoDB');

    // Start server
    await app.listen({
      port: config.PORT,
      host: config.HOST,
    });

    app.log.info(`Server running on http://${config.HOST}:${config.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

// Handle graceful shutdown
const signals = ['SIGINT', 'SIGTERM'];
signals.forEach((signal) => {
  process.on(signal, async () => {
    app.log.info(`Received ${signal}, shutting down gracefully...`);
    await app.close();
    process.exit(0);
  });
});

start();
