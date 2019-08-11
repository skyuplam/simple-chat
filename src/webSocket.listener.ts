import {
  webSocketListener, WsConnectionEffect, WebSocketConnectionError,
} from '@marblejs/websockets';
import { HttpStatus } from '@marblejs/core';
import { mergeMap } from 'rxjs/operators';
import { iif, throwError, of } from 'rxjs';

import { logger$ } from './middlewares/ws.logger';
import * as messages$ from './effects/messages';


const connection$: WsConnectionEffect = req$ =>
  req$.pipe(
    mergeMap(req => iif(
      () => req.headers.upgrade !== 'websocket',
      throwError(new WebSocketConnectionError(
        'Unauthorized', HttpStatus.UNAUTHORIZED,
      )),
      of(req),
    )),
  );

export default webSocketListener({
  middlewares: [logger$],
  effects: [...Object.values(messages$)],
  connection$,
});
