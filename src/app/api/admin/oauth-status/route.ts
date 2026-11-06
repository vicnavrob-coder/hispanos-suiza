import { NextResponse } from "next/server";

export async function GET() {
  // Check if environment variables are configured
  const googleConfigured = Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID_HERE" &&
    process.env.GOOGLE_CLIENT_SECRET !== "YOUR_GOOGLE_CLIENT_SECRET_HERE"
  );

  const emailConfigured = Boolean(
    process.env.EMAIL_SERVER_HOST &&
    process.env.NEWSLETTER_GMAIL_USER &&
    process.env.NEWSLETTER_GMAIL_PASS
  );

  const nextAuthConfigured = Boolean(
    process.env.NEXTAUTH_SECRET &&
    process.env.NEXTAUTH_URL
  );

  const stripeConfigured = Boolean(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_PRODUCT_ID_PREMIUM &&
    process.env.STRIPE_PRICE_ID_PREMIUM
  );

  return NextResponse.json({
    googleConfigured,
    emailConfigured,
    nextAuthConfigured,
    stripeConfigured,
  });
}
