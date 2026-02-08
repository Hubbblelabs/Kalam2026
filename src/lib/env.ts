import { z } from 'zod';

const envSchema = z.object({
  // General
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Database
  MONGODB_URI: z.string(),

  // Session
  SESSION_SECRET: z.string().min(32),

  // Password hashing (Argon2id)
  ARGON2_MEMORY: z.coerce.number().min(16384).default(32768),
  ARGON2_TIME: z.coerce.number().min(2).default(2),
  ARGON2_PARALLELISM: z.coerce.number().min(1).default(2),

  // Email (SMTP)
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
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
export type Env = z.infer<typeof envSchema>;
