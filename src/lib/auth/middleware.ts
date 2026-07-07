import { NextResponse, type NextRequest } from 'next/server';

import { hasSession } from './session';

const AUTH_PATHS = ['/login', '/signup'];

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isDashboardPath = pathname.startsWith('/dashboard');
  const sessionExists = await hasSession(request.headers);

  // Dashboard routes require a valid session before checking permissions.
  if (isDashboardPath && !sessionExists) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Signed-in users should not return to auth entry pages.
  if (AUTH_PATHS.includes(pathname) && sessionExists) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Public and allowed requests continue unchanged.
  return NextResponse.next();
}
