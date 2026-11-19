import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Force no-cache for new premium routes
  if (
    request.nextUrl.pathname.startsWith('/servicios-premium') ||
    request.nextUrl.pathname.startsWith('/suiza-starter-pack')
  ) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    response.headers.set('Surrogate-Control', 'no-store');
    response.headers.set('X-Vercel-Cache', 'BYPASS');
  }

  return response;
}

export const config = {
  matcher: [
    '/servicios-premium/:path*',
    '/suiza-starter-pack/:path*',
  ],
};
