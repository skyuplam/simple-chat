import { find, map } from 'lodash';
import db from '../db';

const users = db.users;
export type Users = typeof users;
export interface User {
  id: keyof Users;
  name: string;
  online: boolean;
}

export function findUserByName(name?: string) {
  return find(users, user => user.name === name);
}

export function isAuthorized(payload: { name: string }) {
  return Boolean(findUserByName(payload.name));
}

export function getUsers() {
  return map(users);
}

export function toggleUserOnline(userId: keyof Users) {
  users[userId].online = !users[userId].online;
}
