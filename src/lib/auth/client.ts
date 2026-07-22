import { createAuthClient } from 'better-auth/react';
import { organizationClient } from 'better-auth/client/plugins';
import { env } from '@/config/env';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_AUTH_URL,
  fetchOptions: {
    credentials: 'include',
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
