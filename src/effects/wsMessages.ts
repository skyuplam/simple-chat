import { WsEffect, broadcast } from '@marblejs/websockets';
import { matchEvent } from '@marblejs/core';
import { setUserOnline, User } from '../utils/dbHelpers';
import { subscriptionMsg, unsubscriptionMsg } from '../utils/message';


export const subscription$: WsEffect = (event$, client) =>
  event$.pipe(
    matchEvent('SUBSCRIPTION'),
    broadcast(client, (event) => {
      const { user: { name, id: userId } } = event.payload as { user: User };
      setUserOnline(userId, true);
      const msg = subscriptionMsg(name);
      // TODO: Cache the message
      return msg;
    }),
  );

export const unsubscription$: WsEffect = (event$, client) =>
  event$.pipe(
    matchEvent('UNSUBSCRIPTION'),
    broadcast(client, (event) => {
      const { user } = event.payload as { user: User };
      const { name, id: userId } = user;
      setUserOnline(userId, false);
      const msg = unsubscriptionMsg(name, [user]);
      // TODO: Cache the message
      return msg; }),
  );

export const messages$: WsEffect = (event$, client) =>
  event$.pipe(
    matchEvent('MESSAGE'),
    broadcast(client, (event) => {
      return {
        type: 'MESSAGE',
        payload: event.payload,
      };
    }),
  );
