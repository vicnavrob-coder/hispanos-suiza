/**
 * Environment Variables Validation
 *
 * This file validates all environment variables at startup using Zod.
 * Missing or invalid env vars will cause the application to fail fast with clear error messages.
 */

import { z } from 'zod';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Environment Schema
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const envSchema = z.object({
  // ── Node Environment ──
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // ── Database (GitHub Gist) ──
  GIST_ID_USERS: z.string().min(1, 'GIST_ID_USERS is required'),
  GIST_ID_HISTORIAS: z.string().min(1, 'GIST_ID_HISTORIAS is required'),
  GIST_ID_SUBSCRIBERS: z.string().min(1, 'GIST_ID_SUBSCRIBERS is required'),
  GIST_ID_UNIA_CITAS: z.string().min(1, 'GIST_ID_UNIA_CITAS is required'),
  GIST_ID_CV_USAGE: z.string().min(1, 'GIST_ID_CV_USAGE is required'),
  GIST_ID_CV_QUEUE: z.string().min(1, 'GIST_ID_CV_QUEUE is required'),
  GITHUB_TOKEN: z.string().min(1, 'GITHUB_TOKEN is required'),

  // ── Stripe (Payment Processing) ──
  STRIPE_SECRET_KEY: z.string().min(1, 'STRIPE_SECRET_KEY is required'),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, 'STRIPE_WEBHOOK_SECRET is required'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1, 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required'),

  // ── Email (Newsletter & Notifications) ──
  NEWSLETTER_GMAIL_USER: z.string().email('NEWSLETTER_GMAIL_USER must be a valid email').optional(),
  NEWSLETTER_GMAIL_PASS: z.string().optional(),

  // ── Social Media (Auto-Publishing) ──
  FACEBOOK_ACCESS_TOKEN: z.string().optional(),
  FACEBOOK_PAGE_ID: z.string().optional(),
  INSTAGRAM_ACCESS_TOKEN: z.string().optional(),
  INSTAGRAM_BUSINESS_ACCOUNT_ID: z.string().optional(),

  // ── Public URLs ──
  NEXT_PUBLIC_BASE_URL: z.string().url('NEXT_PUBLIC_BASE_URL must be a valid URL').default('http://localhost:3000'),
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Validate and Export
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function validateEnv() {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    result.error.issues.forEach((err: z.ZodIssue) => {
      console.error(`  - ${err.path.join('.')}: ${err.message}`);
    });
    throw new Error('Environment validation failed. Please check your .env file.');
  }

  return result.data;
}

// Validate env vars and export typed object
export const env = validateEnv();

// Type-safe env access
export type Env = z.infer<typeof envSchema>;
