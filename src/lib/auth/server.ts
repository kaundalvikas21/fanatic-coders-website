import 'server-only';

import { redirect } from 'next/navigation';
import { authServerClient, getServerAuthFetchOptions } from '@/lib/auth/server-client';

export async function requireAuth() {
  const result = await authServerClient.getSession({
    fetchOptions: await getServerAuthFetchOptions(),
  });

  if (!result.data?.user) {
    redirect('/login');
  }

  return result.data;
}
