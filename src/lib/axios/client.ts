import { cookies } from 'next/headers';
import axios, { AxiosHeaders, type AxiosInstance } from 'axios';

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

  const cookieHeader = (await cookies()).toString();

  if (cookieHeader) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set('Cookie', cookieHeader);
    config.headers = headers;
  }

  return config;
});
