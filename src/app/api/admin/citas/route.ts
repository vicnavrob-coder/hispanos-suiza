import { NextRequest, NextResponse } from 'next/server';
import { getCitas } from '@/lib/unia-citas';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || 'hispanos-admin-2026';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const citas = await getCitas();
    return NextResponse.json(citas || []);
  } catch (error) {
    console.error('Error fetching citas:', error);
    return NextResponse.json({ error: 'Failed to fetch citas' }, { status: 500 });
  }
}
