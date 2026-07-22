// Creates the browser Better Auth client and attaches the stored bearer token.
import { createAuthClient } from 'better-auth/react';
import { organizationClient } from 'better-auth/client/plugins';
import { FCOP_AUTH_TOKEN_STORAGE_KEY } from '@/lib/auth/bearer-token';
import { env } from '@/config/env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  fetchOptions: {
    credentials: 'include',
    auth: {
      type: 'Bearer',
      token: () =>
        typeof window === 'undefined'
          ? ''
          : localStorage.getItem(FCOP_AUTH_TOKEN_STORAGE_KEY) || '',
    },
  },
  plugins: [
    organizationClient({
      teams: {
        enabled: true,
      },
    }),
  ],
});

export const {
  resetPassword,
  signIn,
  signOut,
  signUp,
  useActiveMember,
  useActiveMemberRole,
  useActiveOrganization,
  useListOrganizations,
  useSession,
} = authClient;
