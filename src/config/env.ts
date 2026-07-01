const trimTrailingSlash = (value: string) => value.replace(/\/$/, '');

export const env = {
  NEXT_PUBLIC_API_URL: trimTrailingSlash(
    process.env.NEXT_PUBLIC_API_URL ??
      process.env.NEXT_PUBLIC_AUTH_URL ??
      process.env.AUTH_BACKEND_URL ??
      'http://localhost:5000',
  ),
  NEXT_PUBLIC_AUTH_URL: trimTrailingSlash(
    process.env.NEXT_PUBLIC_AUTH_URL ?? process.env.AUTH_BACKEND_URL ?? 'http://localhost:3005',
  ),
} as const;
