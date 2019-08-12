import { WsEffect, broadcast } from '@marblejs/websockets';
import { matchEvent } from '@marblejs/core';
import cuid from 'cuid';
import {
  getUsers, setUserOnline, User,
} from '../utils/dbHelpers';


const systemMsg = (content: string) => ({
  type: 'SYSTEM',
  payload: {
    id: cuid(),
    content,
    meta: {
      createdAt: (new Date()).toISOString(),
      users: getUsers(),
    },
  }
});

const subscriptionMsg = (name: string) => {
  const content = `${name} joined.`;
  return systemMsg(content);
};

const unsubscriptionMsg = (name: string) => {
  const content = `${name} left.`;
  return systemMsg(content);
};

export const systemMessages$: WsEffect = event$ =>
  event$.pipe(
    matchEvent('SYSTEM'),
  );

export const subscription$: WsEffect = (event$, client$) =>
  event$.pipe(
    matchEvent('SUBSCRIPTION'),
    broadcast(client$, (event) => {
      const { user: { name, id: userId } } = event.payload as { user: User };
      setUserOnline(userId, true);
      const msg = subscriptionMsg(name);
      // TODO: Cache the message
      return msg;
    }),
  );

export const unsubscription$: WsEffect = (event$, client$) =>
  event$.pipe(
    matchEvent('UNSUBSCRIPTION'),
    broadcast(client$, (event) => {
      const { user: { name, id: userId } } = event.payload as { user: User };
      setUserOnline(userId, false);
      const msg = unsubscriptionMsg(name);
      // TODO: Cache the message
      return msg; }),
  );
