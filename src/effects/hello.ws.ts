import { WsEffect } from '@marblejs/websockets';
import { matchEvent } from '@marblejs/core';
import { mapTo } from 'rxjs/operators';

export const hello$: WsEffect = event$ =>
  event$.pipe(
    matchEvent('HELLO'),
    mapTo({ type: 'HELLO_RESULT', payload: { hello: 'world' } }),
  );
