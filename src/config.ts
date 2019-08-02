import { loadEnv } from './utils/env';

loadEnv();

export const API_PORT = process.env.API_PORT
  ? parseInt(process.env.API_PORT, 10)
  : 80;
export const API_HOST = process.env.API_HOST || '0.0.0.0';
