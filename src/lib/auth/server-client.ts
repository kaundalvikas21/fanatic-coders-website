import 'server-only';

import { cookies } from 'next/headers';
import { createAuthClient } from 'better-auth/client';
import { organizationClient } from 'better-auth/client/plugins';

import { env } from '@/config/env';

export const authServerClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  plugins: [
    organizationClient({
      teams: {
        enabled: true,
      },
    }),
  ],
});

export async function getServerAuthFetchOptions() {
  return {
    cache: 'no-store' as const,
    headers: {
      cookie: (await cookies()).toString(),
    },
  };
}
