import {
  webSocketListener, WsConnectionEffect, WebSocketConnectionError,
} from '@marblejs/websockets';
import { HttpStatus, use } from '@marblejs/core';
import { mergeMap } from 'rxjs/operators';
import { iif, throwError, of } from 'rxjs';

import { logger$ } from '../middlewares/wsLogger';
import * as messages$ from '../effects/wsMessages';
import { authorize$ } from '../middlewares/auth';
import { jwtConfig } from '../config';


const connection$: WsConnectionEffect = req$ =>
  req$.pipe(
    // @ts-ignore
    use(authorize$(jwtConfig)),
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
