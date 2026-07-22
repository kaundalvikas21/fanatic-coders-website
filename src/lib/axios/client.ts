import { cookies } from 'next/headers';
import axios, { AxiosHeaders, type AxiosInstance } from 'axios';

import { createBearerAuthorizationHeader, FCOP_AUTH_TOKEN_COOKIE } from '@/lib/auth/bearer-token';
import { env } from '@/config/env';

const defaultHeaders = {
  Accept: 'application/json',
};

export const publicApi: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: defaultHeaders,
});

export const authApi: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: defaultHeaders,
  withCredentials: true,
});

authApi.interceptors.request.use(async (config) => {
  config.withCredentials = true;

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const authorization = createBearerAuthorizationHeader(
    cookieStore.get(FCOP_AUTH_TOKEN_COOKIE)?.value,
  );

  if (cookieHeader || authorization) {
    const headers = AxiosHeaders.from(config.headers);

    if (cookieHeader) {
      headers.set('Cookie', cookieHeader);
    }

    if (authorization) {
      headers.set('Authorization', authorization);
    }

    config.headers = headers;
  }

  return config;
});
