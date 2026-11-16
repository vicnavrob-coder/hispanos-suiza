import { NextRequest, NextResponse } from 'next/server';
import { getSubscribers } from '@/lib/subscribers';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || 'hispanos-admin-2026';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const subscribers = await getSubscribers();
    return NextResponse.json(subscribers || []);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
