import { Ep, isActionOf } from 'typesafe-actions';
import {
  filter, switchMap, map, takeUntil, retryWhen, delay,
} from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { ChatEvent } from 'SCModels';

import {
  startMessageStream, stopMessageStream,
  receiveMessage,
  receiveSystemMessage,
} from './actions';
import { API_HOST, API_PORT } from '../../config';

const url = ['ws://', API_HOST, ':', API_PORT, '/api/ws'].join('');
const socket$ = webSocket<ChatEvent>(url);

export const messageStreamEpic: Ep = action$ => action$.pipe(
  filter(isActionOf([startMessageStream])),
  switchMap(({ payload }) => socket$.multiplex(
    () => ({ type: 'subscribe', payload: payload.user }),
    () => ({ type: 'unsubscribe', payload: payload.user }),
    (msg) => Boolean(msg.type),
  ).pipe(
    map(msg => {
      if (msg.type === 'MESSAGE') {
        return receiveMessage(msg);
      }
      return receiveSystemMessage(msg);
    }),
    takeUntil(action$.pipe(filter(isActionOf(stopMessageStream)))),
    retryWhen(error$ => error$.pipe(
      delay(1000),
    )),
  )),
);

// export const sendMessageEpic: Ep = action$ => action$.pipe(
//   filter(isActionOf([sendMessage.request])),
//   switchMap(() => {
//     socket$.next({ type: 'HELLO' });
//     return empty();
//   }),
// );
