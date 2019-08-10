import { Ep, isActionOf } from 'typesafe-actions';
import { empty } from 'rxjs';
import {
  filter, switchMap, map, takeUntil, retryWhen, delay,
} from 'rxjs/operators';
import { ChatEvent } from 'SCModels';
import webSocket from '../../utils/webSocketObservable';
import webSocketCreator from '../../utils/webSocket';
import {
  startMessageStream, stopMessageStream,
  receiveMessage, receiveSystemMessage, receiveErrorMessage,
  sendMessage,
} from './actions';
import { API_HOST, API_PORT } from '../../config';


const url = ['ws://', API_HOST, ':', API_PORT, '/api/ws'].join('');
const socket$ = webSocket<ChatEvent>({ url, webSocketCreator });

export const messageStreamEpic: Ep = action$ => action$.pipe(
  filter(isActionOf([startMessageStream])),
  switchMap(() => socket$.pipe(
    map(msg => {
      if (msg.type === 'MESSAGE') {
        return receiveMessage(msg);
      }
      if (msg.type === 'SYSTEM') {
        return receiveSystemMessage(msg);
      }
      return receiveErrorMessage(msg);
    }),
    takeUntil(action$.pipe(filter(isActionOf(stopMessageStream)))),
    retryWhen(error$ => error$.pipe(
      delay(1000),
    )),
  )),
);

export const sendMessageEpic: Ep = action$ => action$.pipe(
  filter(isActionOf([sendMessage.request])),
  switchMap(({ payload }) => {
    socket$.next({ type: 'MESSAGE', payload });
    return empty();
  }),
);
