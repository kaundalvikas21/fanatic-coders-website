const LOCAL_REDIRECT_ORIGIN = 'http://localhost';

export function getSafeDashboardRedirectPath(value: string | string[] | undefined) {
  if (typeof value !== 'string') {
    return null;
  }

  try {
    const redirectUrl = new URL(value, LOCAL_REDIRECT_ORIGIN);
    const isLocalUrl = redirectUrl.origin === LOCAL_REDIRECT_ORIGIN;
    const isDashboardUrl =
      redirectUrl.pathname === '/dashboard' || redirectUrl.pathname.startsWith('/dashboard/');

    if (!isLocalUrl || !isDashboardUrl) {
      return null;
    }

    return `${redirectUrl.pathname}${redirectUrl.search}`;
  } catch {
    return null;
  }
}
