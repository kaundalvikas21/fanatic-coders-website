import { authClient } from '@/lib/auth/client';
import {
  createBearerAuthorizationHeader,
  getBearerTokenFromCookieHeader,
} from '@/lib/auth/bearer-token';

export async function hasSession(headers: Headers): Promise<boolean> {
  return Boolean(await getSessionUser(headers));
}

async function getSessionUser(headers: Headers): Promise<unknown> {
  const cookie = headers.get('cookie');
  const authorization = headers.get('authorization');

  if (!cookie && !authorization) {
    return null;
  }

  const requestHeaders = new Headers();

  if (cookie) {
    requestHeaders.set('cookie', cookie);
    const bearerAuthorization = createBearerAuthorizationHeader(
      getBearerTokenFromCookieHeader(cookie),
    );

    if (bearerAuthorization) {
      requestHeaders.set('authorization', bearerAuthorization);
    }
  }

  if (authorization) {
    requestHeaders.set('authorization', authorization);
  }

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
