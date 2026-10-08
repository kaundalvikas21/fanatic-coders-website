// Creates the browser Better Auth client and attaches the stored bearer token.
import { createAuthClient } from 'better-auth/react';
import { adminClient, inferAdditionalFields, organizationClient } from 'better-auth/client/plugins';
import { FCOP_AUTH_TOKEN_STORAGE_KEY } from '@/lib/auth/bearer-token';
import { env } from '@/config/env';
import { additionalUserFields } from '@/lib/auth/additional-fields';

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
  plugins: [organizationClient(), adminClient(), inferAdditionalFields(additionalUserFields)],
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
