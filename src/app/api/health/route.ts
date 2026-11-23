import { NextResponse } from 'next/server';

/**
 * Health check endpoint para verificar que el sistema está funcionando
 */
export async function GET() {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: {
      node: process.version,
      nextjs: '16.4.5',
    },
    variables: {
      anthropic: !!process.env.ANTHROPIC_API_KEY,
      github: !!process.env.GITHUB_TOKEN,
      stripe: !!process.env.STRIPE_SECRET_KEY,
      newsletter: !!process.env.NEWSLETTER_GMAIL_USER,
      nextauth: !!process.env.NEXTAUTH_SECRET,
      gist_eventos: !!process.env.NEXT_PUBLIC_GIST_ID_EVENTOS,
    },
  };

  // Verificar si hay variables críticas faltantes
  const missingCritical = [];
  if (!process.env.ANTHROPIC_API_KEY) missingCritical.push('ANTHROPIC_API_KEY');
  if (!process.env.GITHUB_TOKEN) missingCritical.push('GITHUB_TOKEN');
  if (!process.env.STRIPE_SECRET_KEY) missingCritical.push('STRIPE_SECRET_KEY');
  if (!process.env.NEXTAUTH_SECRET) missingCritical.push('NEXTAUTH_SECRET');

  if (missingCritical.length > 0) {
    return NextResponse.json(
      {
        ...checks,
        status: 'warning',
        warnings: {
          message: 'Variables críticas faltantes',
          missing: missingCritical,
        },
      },
      { status: 200 } // 200 para que no falle health checks
    );
  }

  return NextResponse.json(checks);
}

export const dynamic = 'force-dynamic';
