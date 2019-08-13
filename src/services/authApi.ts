import { Credential, FetchSuccess } from 'SCModels';
import fetchAPI from '../utils/fetch';
import { API_ENDPOINT } from '../config';

const url = [API_ENDPOINT, 'sessions'].join('/');

export function postSession(payload: Credential): Promise<FetchSuccess> {
  return fetchAPI(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function getSession(): Promise<FetchSuccess> {
  return fetchAPI(url, {
    credentials: 'include',
  });
}
