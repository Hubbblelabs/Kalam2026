import { z } from 'zod';

const envSchema = z.object({
  // General
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Database
  MONGODB_URI: z.string().default('mongodb://localhost:27017/kalam2026'),

  // JWT
  JWT_ACCESS_SECRET: z.string().min(32).optional(), // Optional for build time, check at runtime if needed
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),

  // Password
  BCRYPT_SALT_ROUNDS: z.coerce.number().default(12),

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

// Validate process.env
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  // In Next.js, we might not want to throw immediately during build if vars are missing, 
  // but for runtime it's important. 
  // process.exit(1); 
}

export const config = parsed.success ? parsed.data : process.env as any;
