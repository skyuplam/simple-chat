import { createServer, bindTo } from '@marblejs/core';
import httpListener from './http.listener';
import webSocketListener from './webSocket.listener';
import { WebSocketServerToken } from './tokens';


export const server = createServer({
  port: 8080,
  hostname: 'localhost',
  httpListener,
  dependencies: [
    bindTo(WebSocketServerToken)(webSocketListener({ port: 8081 }).run),
  ],
});

server.run();
