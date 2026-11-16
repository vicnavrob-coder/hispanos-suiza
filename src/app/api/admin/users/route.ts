import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/lib/users';

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || 'hispanos-admin-2026';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const usersData = await getUsers();
    return NextResponse.json({ users: usersData?.users || [] });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
