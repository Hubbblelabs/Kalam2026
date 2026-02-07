import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { User } from '../models/user.model.js';

interface JWTPayload {
  id: string;
  email: string;
  role: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string;
      email: string;
      role: string;
    };
  }
}

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return reply.status(401).send({
        success: false,
        error: { message: 'Access token required' },
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET) as JWTPayload;

    // Optionally verify user still exists
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return reply.status(401).send({
        success: false,
        error: { message: 'User not found' },
      });
    }

    request.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    return reply.status(401).send({
      success: false,
      error: { message: 'Invalid or expired token' },
    });
  }
};

export const isAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  if (request.user?.role !== 'admin') {
    return reply.status(403).send({
      success: false,
      error: { message: 'Admin access required' },
    });
  }
};
