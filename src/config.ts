/**
 * Centralized config file
 *
 */
import { loadEnv } from './utils/env';

/**
 * Call [[loadEnv]] to load dot env vars
 */
loadEnv();

/**
 * API config
 */
export const API_PORTOCOL = process.env.API_PORTOCOL || 'http';
export const API_PORT = process.env.API_PORT
  ? parseInt(process.env.API_PORT, 10)
  : 80;
export const API_HOST = process.env.API_HOST || '0.0.0.0';

export const API_ENDPOINT = [
  [API_PORTOCOL, [API_HOST, API_PORT].join(':')].join('://'),
  '/api',
].join('');

/**
 * JWT config
 */
export const SECRET_KEY = process.env.SECRET_KEY || 'n0s9d8fj3259jsdfiokinn980u98sfg09i0jsmdfguipjmi';

export const jwtConfig = {
  secret: SECRET_KEY,
  algorithm: 'HS512',
};

/**
 * Cookies config
 */
export const COOKIE_KEY = process.env.COOKIE_KEY || 'token';
