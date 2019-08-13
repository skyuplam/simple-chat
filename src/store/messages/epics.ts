import { Ep, isActionOf } from 'typesafe-actions';
import { empty } from 'rxjs';
import {
  filter, switchMap, map, takeUntil, retryWhen, delay, withLatestFrom,
} from 'rxjs/operators';
import { ChatEvent, User } from 'SCModels';
import webSocket from '../../utils/webSocketObservable';
import webSocketCreator from '../../utils/webSocket';
import {
  stopMessageStream,
  receiveMessage, receiveSystemMessage, receiveErrorMessage,
  sendMessage,
  sendEditedMessage,
} from './actions';
import { createSession, validateSession, storeCookie } from '../auth/actions';
import { API_HOST, API_PORT } from '../../config';
import { selectMessageToSend } from './selectors';


const url = ['ws://', API_HOST, ':', API_PORT, '/api/ws'].join('');
const socket$ = webSocket<ChatEvent>({ url, webSocketCreator });

export const messageStreamEpic: Ep = action$ => action$.pipe(
  filter(isActionOf([storeCookie.success, validateSession.success])),
  switchMap(() => socket$.pipe(
    map(msg => {
      if (msg.type === 'MESSAGE') {
        return receiveMessage(msg);
      }
      if (msg.type === 'ERROR') {
        return receiveErrorMessage(msg);
      }
      return receiveSystemMessage(msg);
    }),
    takeUntil(action$.pipe(filter(isActionOf(stopMessageStream)))),
    retryWhen(error$ => error$.pipe(
      delay(1000),
    )),
  )),
);

export const sendSubscribeMsg: Ep = action$ => action$.pipe(
  filter(isActionOf([createSession.success, validateSession.success])),
  delay(1000),
  switchMap((action) => {
    const { payload: { payload } } = action;
    const { token, user } = payload as { token: string; user: User };
    const createdAt = (new Date()).toISOString();
    socket$.next({
      type: 'SUBSCRIPTION',
      payload: { token, user, createdAt },
    });
    return empty();
  }),
);

export const sendMessageEpic: Ep = (action$, state$) => action$.pipe(
  filter(isActionOf([sendMessage])),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    const { payload } = action;
    socket$.next({
      type: 'MESSAGE',
      payload: selectMessageToSend(payload)(state),
    });
    return empty();
  }),
);

export const sendEditedMessageEpic: Ep = action$ => action$.pipe(
  filter(isActionOf([sendEditedMessage])),
  switchMap(action => {
    const { payload } = action;
    socket$.next({
      type: 'MESSAGE',
      payload: payload,
    });
    return empty();
  }),
);
