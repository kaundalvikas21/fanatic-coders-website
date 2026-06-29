import { NextResponse, type NextRequest } from 'next/server';

import { getRole, hasSession } from './session';
import type { Role } from '@/types';

const AUTH_PATHS = ['/login', '/signup'];
const ADMIN_ROLE: Role = 'ADMIN';
const USER_ROLE: Role = 'USER';
const ROLE_HOME = {
  ADMIN: '/dashboard/admin',
  USER: '/dashboard/user/',
};

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

  // Dashboard route groups require the matching user role.
  if (isDashboardPath) {
    const role = await getRole(request.headers);

    if (pathname.startsWith('/dashboard/admin') && role !== ADMIN_ROLE) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/dashboard/user') && role !== USER_ROLE) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname === '/dashboard' && role) {
      return NextResponse.redirect(new URL(ROLE_HOME[role], request.url));
    }
  }

  // Signed-in users should not return to auth entry pages.
  if (AUTH_PATHS.includes(pathname) && sessionExists) {
    const role = await getRole(request.headers);

    return NextResponse.redirect(new URL(role ? ROLE_HOME[role] : '/dashboard', request.url));
  }

  // Public and allowed requests continue unchanged.
  return NextResponse.next();
}
