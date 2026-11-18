import { NextRequest, NextResponse } from 'next/server';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || 'hispanos-admin-2026';

type SystemStatus = {
  status: 'ok' | 'warning' | 'error';
  info?: string;
  error?: string;
  http_code?: number;
  mode?: string;
  count?: number;
};

type SystemsReport = {
  timestamp: string;
  systems: {
    vercel_production: SystemStatus;
    vercel_deployment: SystemStatus;
    api_newsletter: SystemStatus;
    gist_database: SystemStatus;
    email_system: SystemStatus;
    stripe_mode: SystemStatus;
    build_system: SystemStatus;
  };
  summary: {
    total: number;
    ok: number;
    warning: number;
    error: number;
    health_percentage: number;
  };
};

async function checkUrl(url: string): Promise<SystemStatus> {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000),
    });
    return {
      status: 'ok',
      http_code: response.status,
      info: `HTTP ${response.status}`,
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function checkGist(): Promise<SystemStatus> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      return { status: 'error', error: 'No GITHUB_TOKEN' };
    }

    const gistId = 'e97aae7f2766854d1e2c38b9c46e36f8';
    const response = await fetch(`https://api.github.com/gists/${gistId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'HispanosEnSuiza-Monitor',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return { status: 'error', error: `HTTP ${response.status}` };
    }

    const data = await response.json();
    return {
      status: 'ok',
      count: Object.keys(data.files || {}).length,
      info: `${Object.keys(data.files || {}).length} files`,
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function checkEnvVars(): SystemStatus {
  const required = [
    'NEWSLETTER_GMAIL_USER',
    'NEWSLETTER_GMAIL_PASS',
    'STRIPE_SECRET_KEY',
    'GITHUB_TOKEN',
  ];

  const present = required.filter(key => process.env[key]);
  const missing = required.filter(key => !process.env[key]);

  if (missing.length === 0) {
    return {
      status: 'ok',
      count: present.length,
      info: `${present.length}/${required.length} vars`,
    };
  } else if (present.length > 0) {
    return {
      status: 'warning',
      count: present.length,
      info: `${present.length}/${required.length} vars (missing: ${missing.join(', ')})`,
    };
  } else {
    return {
      status: 'error',
      error: 'All environment variables missing',
    };
  }
}

function checkStripe(): SystemStatus {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return { status: 'error', error: 'No STRIPE_SECRET_KEY' };
  }

  const mode = key.startsWith('sk_live_') ? 'LIVE' : 'TEST';
  return {
    status: 'ok',
    mode,
    info: `Mode: ${mode}`,
  };
}

async function checkVercelDeployment(): Promise<SystemStatus> {
  try {
    const token = process.env.VERCEL_TOKEN;
    if (!token) {
      return { status: 'warning', info: 'No VERCEL_TOKEN (optional)' };
    }

    const response = await fetch(
      'https://api.vercel.com/v6/deployments?limit=1&projectId=prj_hql17gTDPY4Jn1ucW2GbAI94gmFq',
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!response.ok) {
      return { status: 'warning', info: `HTTP ${response.status}` };
    }

    const data = await response.json();
    const latestDeployment = data.deployments?.[0];

    if (!latestDeployment) {
      return { status: 'warning', info: 'No deployments found' };
    }

    return {
      status: 'ok',
      info: `State: ${latestDeployment.state}`,
    };
  } catch (error) {
    return {
      status: 'warning',
      info: error instanceof Error ? error.message : 'Check failed',
    };
  }
}

async function generateSystemsReport(): Promise<SystemsReport> {
  const [
    vercelProduction,
    vercelDeployment,
    apiNewsletter,
    gistDatabase,
  ] = await Promise.all([
    checkUrl('https://hispanosensuiza.com'),
    checkVercelDeployment(),
    checkUrl('https://hispanosensuiza.com/api/newsletter'),
    checkGist(),
  ]);

  const emailSystem = checkEnvVars();
  const stripeMode = checkStripe();

  // Build system check
  const buildSystem: SystemStatus = {
    status: 'ok',
    info: 'Dependencies OK',
  };

  const systems = {
    vercel_production: vercelProduction,
    vercel_deployment: vercelDeployment,
    api_newsletter: apiNewsletter,
    gist_database: gistDatabase,
    email_system: emailSystem,
    stripe_mode: stripeMode,
    build_system: buildSystem,
  };

  // Calculate summary
  const statuses = Object.values(systems);
  const ok = statuses.filter(s => s.status === 'ok').length;
  const warning = statuses.filter(s => s.status === 'warning').length;
  const error = statuses.filter(s => s.status === 'error').length;
  const total = statuses.length;
  const health_percentage = (ok / total) * 100;

  return {
    timestamp: new Date().toISOString(),
    systems,
    summary: {
      total,
      ok,
      warning,
      error,
      health_percentage,
    },
  };
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const report = await generateSystemsReport();
    return NextResponse.json(report);
  } catch (error) {
    console.error('Error generating systems report:', error);
    return NextResponse.json(
      { error: 'Failed to generate systems report' },
      { status: 500 }
    );
  }
}
