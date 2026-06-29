export function getAuthBaseUrl() {
  return (
    process.env.NEXT_PUBLIC_AUTH_URL ??
    process.env.AUTH_BACKEND_URL ??
    'http://localhost:3005'
  ).replace(/\/$/, '');
}
