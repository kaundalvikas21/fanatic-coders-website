export const FCOP_AUTH_TOKEN_COOKIE = 'fcop_auth_token';
export const FCOP_AUTH_TOKEN_STORAGE_KEY = 'fcop_auth_token';

export function createBearerAuthorizationHeader(token?: string | null) {
  return token ? `Bearer ${token}` : undefined;
}

export function getBearerTokenFromCookieHeader(cookieHeader?: string | null) {
  if (!cookieHeader) {
    return null;
  }

  const tokenCookie = cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${FCOP_AUTH_TOKEN_COOKIE}=`));

  if (!tokenCookie) {
    return null;
  }

  const [, value] = tokenCookie.split('=');

  try {
    return decodeURIComponent(value ?? '');
  } catch {
    return value ?? '';
  }
}

export function withBearerAuthorizationFromCookies(headers: Headers) {
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has('authorization')) {
    const token = getBearerTokenFromCookieHeader(requestHeaders.get('cookie'));
    const authorization = createBearerAuthorizationHeader(token);

    if (authorization) {
      requestHeaders.set('authorization', authorization);
    }
  }

  return requestHeaders;
}
