import type { NextRequest } from 'next/server';
import { authMiddleware } from './lib/auth/middleware';

export function proxy(request: NextRequest) {
  // Keep route access rules in the auth middleware so this file stays focused.
  return authMiddleware(request);
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/forgot-password', '/reset-password'],
};
