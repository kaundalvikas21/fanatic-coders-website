// Resolves whether an incoming request has a valid Better Auth session.
import { authClient } from '@/lib/auth/client';
import { withBearerAuthorizationFromCookies } from '@/lib/auth/bearer-token';

export async function hasSession(headers: Headers): Promise<boolean> {
  return Boolean(await getSessionUser(headers));
}

async function getSessionUser(headers: Headers): Promise<unknown> {
  const cookie = headers.get('cookie');
  const authorization = headers.get('authorization');

  if (!cookie && !authorization) {
    return null;
  }

  const requestHeaders = withBearerAuthorizationFromCookies(headers);

  try {
    const { data } = await authClient.getSession({
      fetchOptions: {
        credentials: 'include',
        headers: requestHeaders,
        cache: 'no-store',
      },
    });

    return data?.user ?? null;
  } catch {
    return null;
  }
}
