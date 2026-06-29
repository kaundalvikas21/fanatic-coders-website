import { authClient } from './client';

export async function hasSession(headers: Headers): Promise<boolean> {
  const cookie = headers.get('cookie');
  const authorization = headers.get('authorization');

  if (!cookie && !authorization) {
    return false;
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

    return Boolean(data?.user);
  } catch {
    return false;
  }
}
