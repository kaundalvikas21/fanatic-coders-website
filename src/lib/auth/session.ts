import { authClient } from '@/lib/auth/client';

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
  }

  if (authorization) {
    requestHeaders.set('authorization', authorization);
  }

  try {
    const { data } = await authClient.getSession({
      fetchOptions: {
        headers: requestHeaders,
        cache: 'no-store',
      },
    });

    return data?.user ?? null;
  } catch {
    return null;
  }
}
