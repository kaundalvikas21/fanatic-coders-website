import axios from 'axios';

export const browserApi = axios.create({
  baseURL: '/',
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

browserApi.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});
