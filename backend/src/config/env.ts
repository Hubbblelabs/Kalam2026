import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  // General
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('0.0.0.0'),
  LOG_LEVEL: z.string().default('info'),

  // Database
  MONGODB_URI: z.string().default('mongodb://localhost:27017/kalam2026'),

  // JWT
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  // Password
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),

  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:3000'),

  // Rate Limiting
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),

  // Email
  SMTP_HOST: z.string().default('smtp.gmail.com'),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER_PRODUCTS: z.string().optional(),
  SMTP_PASS_PRODUCTS: z.string().optional(),
  SMTP_USER_SUPPORT: z.string().optional(),
  SMTP_PASS_SUPPORT: z.string().optional(),
  SMTP_FROM_NAME: z.string().default('Kalam 2026'),
  SMTP_FROM_EMAIL: z.string().optional(),

  // PhonePe
  PHONEPE_MERCHANT_ID: z.string().optional(),
  PHONEPE_SALT_KEY: z.string().optional(),
  PHONEPE_SALT_INDEX: z.coerce.number().default(1),
  PHONEPE_ENV: z.enum(['UAT', 'PRODUCTION']).default('UAT'),
  PHONEPE_CALLBACK_URL: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = parsed.data;

export type Config = z.infer<typeof envSchema>;
