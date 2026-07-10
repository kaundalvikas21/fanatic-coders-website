import { NextResponse, type NextRequest } from 'next/server';

import { hasSession } from './session';

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isDashboardPath = pathname.startsWith('/dashboard');
  const isAuthOnlyPath = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(
    pathname,
  );
  const sessionExists = await hasSession(request.headers);

  if (isAuthOnlyPath && sessionExists) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Dashboard routes require a valid session before checking permissions.
  if (isDashboardPath && !sessionExists) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Public and allowed requests continue unchanged.
  return NextResponse.next();
}
