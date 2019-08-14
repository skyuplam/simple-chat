import { find, map, forEach } from 'lodash';
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

export function getOnlineUsers() {
  return map(users).filter(user => user.online);
}

export function setUserOnline(userId: keyof Users, online: boolean) {
  const user = users[userId] as User;
  if (user.online !== online) {
    user.online = online;
  }
}

export function setUsersOnline(online: boolean) {
  forEach(users, user => {
    const { id } = user as User;
    setUserOnline(id, online);
  });
}
