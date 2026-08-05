// Creates the server Better Auth client and forwards cookie/bearer auth headers.
import 'server-only';

import { cookies } from 'next/headers';
import { createAuthClient } from 'better-auth/client';
import { organizationClient } from 'better-auth/client/plugins';

import { createBearerAuthorizationHeader, FCOP_AUTH_TOKEN_COOKIE } from '@/lib/auth/bearer-token';
import { env } from '@/config/env';

export const authServerClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [organizationClient()],
});

export async function getServerAuthFetchOptions() {
  const cookieStore = await cookies();
  const authorization = createBearerAuthorizationHeader(
    cookieStore.get(FCOP_AUTH_TOKEN_COOKIE)?.value,
  );
  const headers: Record<string, string> = {
    cookie: cookieStore.toString(),
  };

  if (authorization) {
    headers.Authorization = authorization;
  }

  return {
    cache: 'no-store' as const,
    headers,
  };
}
