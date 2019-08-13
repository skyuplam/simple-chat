/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncAction } from 'typesafe-actions';
import { Credential, FetchSuccess, FetchFailure } from 'SCModels';


export const createSession = createAsyncAction(
  '@sc/auth/CREATE_SESSION_REQUEST',
  '@sc/auth/CREATE_SESSION_SUCCESS',
  '@sc/auth/CREATE_SESSION_FAILURE',
  '@sc/auth/CREATE_SESSION_CANCEL',
)<Credential, FetchSuccess, FetchFailure, undefined>();

export const storeCookie = createAsyncAction(
  '@sc/auth/STORE_COOKIE_REQUEST',
  '@sc/auth/STORE_COOKIE_SUCCESS',
  '@sc/auth/STORE_COOKIE_FAILURE',
  '@sc/auth/STORE_COOKIE_CANCEL',
)<undefined, undefined, undefined, undefined>();

export const loadCookie = createAsyncAction(
  '@sc/auth/LOAD_COOKIE_REQUEST',
  '@sc/auth/LOAD_COOKIE_SUCCESS',
  '@sc/auth/LOAD_COOKIE_FAILURE',
  '@sc/auth/LOAD_COOKIE_CANCEL',
)<undefined, string, any, undefined>();

export const validateSession = createAsyncAction(
  '@sc/auth/VALIDATE_SESSION_REQUEST',
  '@sc/auth/VALIDATE_SESSION_SUCCESS',
  '@sc/auth/VALIDATE_SESSION_FAILURE',
  '@sc/auth/VALIDATE_SESSION_CANCEL',
)<string, FetchSuccess, FetchFailure, undefined>();
