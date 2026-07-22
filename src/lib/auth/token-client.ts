// Stores and clears the frontend bearer token for browser and server auth flows.
import { FCOP_AUTH_TOKEN_STORAGE_KEY } from '@/lib/auth/bearer-token';

export async function storeFrontendBearerToken(token: string) {
  localStorage.setItem(FCOP_AUTH_TOKEN_STORAGE_KEY, token);

  const response = await fetch('/api/auth-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error('Could not store auth token.');
  }
}

export async function clearFrontendBearerToken() {
  localStorage.removeItem(FCOP_AUTH_TOKEN_STORAGE_KEY);

  await fetch('/api/auth-token', {
    method: 'DELETE',
  });
}
