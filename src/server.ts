import {
  createServer, bindTo, HttpServerEffect, matchEvent, ServerEvent,
} from '@marblejs/core';
import { mapToServer } from '@marblejs/websockets';
import { merge } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import httpListener from './listeners/http';
import webSocketListener from './listeners/webSocket';
import { WebSocketServerToken } from './utils/tokens';
import { API_PORT, API_HOST } from './config';


const upgrade$: HttpServerEffect = (event$, _, { ask }) =>
  event$.pipe(
    matchEvent(ServerEvent.upgrade),
    mapToServer({
      path: '/api/ws',
      server: ask(WebSocketServerToken),
    }),
  );

const listening$: HttpServerEffect = event$ =>
  event$.pipe(
    matchEvent(ServerEvent.listening),
    map(event => event.payload),
    tap(({ port, host }) =>
      console.log(`Server running @ http://${host}:${port}/ 🚀`),
    ),
  );

export const server = createServer({
  port: API_PORT,
  hostname: API_HOST,
  httpListener,
  dependencies: [
    bindTo(WebSocketServerToken)(webSocketListener().run),
  ],
  event$: (...args) => merge(
    listening$(...args),
    upgrade$(...args),
  ),
});

server.run();
