import { find } from 'lodash';
import db from '../db';

export function findUserByName(name: string) {
  return find(db.users, user => user.name === name);
}

export function isAuthorized(payload: { name: string }) {
  return Boolean(findUserByName(payload.name));
}
