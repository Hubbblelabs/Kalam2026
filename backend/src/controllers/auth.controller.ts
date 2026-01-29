import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { config } from '../config/env.js';

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const generateTokens = (userId: string, email: string, role: string): AuthTokens => {
  const accessToken = jwt.sign(
    { id: userId, email, role },
    config.JWT_ACCESS_SECRET,
    { expiresIn: config.JWT_ACCESS_EXPIRY } as jwt.SignOptions
  );

  const refreshToken = jwt.sign(
    { id: userId, email, role },
    config.JWT_REFRESH_SECRET,
    { expiresIn: config.JWT_REFRESH_EXPIRY } as jwt.SignOptions
  );

  return { accessToken, refreshToken };
};

export const authController = {
  async register(input: RegisterInput) {
    // Check if user exists
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, config.BCRYPT_SALT_ROUNDS);

    // Create user
    const user = await User.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
      phone: input.phone,
    });

    // Generate tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        ...tokens,
      },
    };
  },

  async login(input: LoginInput) {
    // Find user
    const user = await User.findOne({ email: input.email });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(input.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    return {
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        ...tokens,
      },
    };
  },

  async refreshToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET) as {
        id: string;
        email: string;
        role: string;
      };

      // Generate new tokens
      const tokens = generateTokens(decoded.id, decoded.email, decoded.role);

      return {
        success: true,
        data: tokens,
      };
    } catch {
      throw new Error('Invalid or expired refresh token');
    }
  },
};
