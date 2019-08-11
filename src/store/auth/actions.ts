import { createAsyncAction } from 'typesafe-actions';
import { Credential, FetchSuccess, FetchFailure } from 'SCModels';


export const createSession = createAsyncAction(
  '@sc/auth/CREATE_SESSION_REQUEST',
  '@sc/auth/CREATE_SESSION_SUCCESS',
  '@sc/auth/CREATE_SESSION_FAILURE',
  '@sc/auth/CREATE_SESSION_CANCEL',
)<Credential, FetchSuccess, FetchFailure, undefined>();
