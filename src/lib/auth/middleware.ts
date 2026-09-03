// Enforces route-level auth redirects for dashboard and auth-only pages.
import { NextResponse, type NextRequest } from 'next/server';

import { getDashboardRouteRoles } from '@/config/routes';
import { getRole, getRoleHomePath, hasAnyRole } from './roles';
import { hasSession } from './session';

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isDashboardPath = pathname.startsWith('/dashboard');
  const isDashboardHomePath = pathname === '/dashboard' || pathname === '/dashboard/';
  const isAuthOnlyPath = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(
    pathname,
  );
  const sessionExists = await hasSession(request.headers);

  if (isAuthOnlyPath && sessionExists) {
    const role = await getRole(request.headers);

    return NextResponse.redirect(new URL(getRoleHomePath(role), request.url));
  }

  // Dashboard routes require a valid session before checking permissions.
  if (isDashboardPath && !sessionExists) {
    const loginUrl = new URL('/login', request.url);

    // Preserve the protected destination so login can resume the user's task.
    loginUrl.searchParams.set('next', `${pathname}${request.nextUrl.search}`);

    return NextResponse.redirect(loginUrl);
  }

  if (isDashboardHomePath && sessionExists) {
    const role = await getRole(request.headers);

    if (role) {
      return NextResponse.redirect(new URL(getRoleHomePath(role), request.url));
    }
  }

  if (isDashboardPath && sessionExists) {
    const role = await getRole(request.headers);
    const allowedRoles = getDashboardRouteRoles(pathname);

    // Permit only dashboard routes represented by navigation for the current role.
    if (!allowedRoles || !hasAnyRole(role, allowedRoles)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Public and allowed requests continue unchanged.
  return NextResponse.next();
}
