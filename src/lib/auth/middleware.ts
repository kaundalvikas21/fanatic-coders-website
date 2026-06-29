import { NextResponse, type NextRequest } from 'next/server';

import { hasSession } from './session';

const AUTH_PATHS = ['/login', '/signup'];

export async function authMiddleware(request: NextRequest) {
  const sessionExists = await hasSession(request.headers);
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/dashboard') && !sessionExists) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);

    return NextResponse.redirect(loginUrl);
  }

  if (AUTH_PATHS.includes(pathname) && sessionExists) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}
