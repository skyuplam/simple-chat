/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * This is the starting point where a marblejs server starts and listens
 * traffics.
 */

import {
  createServer, bindTo, HttpServerEffect, matchEvent, ServerEvent, HttpRequest,
} from '@marblejs/core';
import {
  mapToServer, MarbleWebSocketServer, MarbleWebSocketClient,
} from '@marblejs/websockets';
import { merge, fromEvent, SchedulerLike, interval } from 'rxjs';
import { tap, map, takeUntil, mapTo } from 'rxjs/operators';

import httpListener from './listeners/http';
import webSocketListener from './listeners/webSocket';
import { WebSocketServerToken } from './utils/tokens';
import { API_PORT, API_HOST } from './config';
import { User, setUserOnline, getUsers } from './utils/dbHelpers';
import { unsubscriptionMsg, subscriptionMsg } from './utils/message';


/**
 * An interface to extend the WebSocket client with user attribute
 */
interface WsClient extends MarbleWebSocketClient { user: User }

/**
 * Heart Beat interval defined according to (marblejs)[https://github.com/marblejs/marble/blob/10178ed9493cc22cea40e0bf6680c947fd94f42c/packages/websockets/src/listener/websocket.helper.ts#L29]
 */
export const HEART_BEAT_INTERVAL = 10 * 1000;
export const HEART_BEAT_TERMINATE_INTERVAL = HEART_BEAT_INTERVAL + 1000;

/**
 * Server event - `upgrade` effect
 *
 * Upgrade the current connection to WebSocket.
 *
 * Please refer to [[HttpServerEffect]] for the details
 */
const upgrade$: HttpServerEffect = (event$, _, { ask }) =>
  event$.pipe(
    matchEvent(ServerEvent.upgrade),
    mapToServer({
      path: '/api/ws',
      server: ask(WebSocketServerToken),
    }),
  );

/**
 * A utility function to extend the WebSocket client
 */
const extendClient = (user: User) => (client: MarbleWebSocketClient) => {
  const ws = client as WsClient;
  ws.user = user;
  return ws;
};

/**
 * A Function to create an interval observable to watch broken connection events
 *
 * @param server WebSocket server
 * @param scheduler for dependency injection for testing purpose
 */
const handleServerBrokenConnections = (
  server: MarbleWebSocketServer,
  scheduler?: SchedulerLike,
) => interval(HEART_BEAT_INTERVAL, scheduler).pipe(
  takeUntil(fromEvent(server, 'close')),
  mapTo(server.clients),
  map(clients => {
    const currentOnlineClients = Array.from(clients).map(client => {
      return client as WsClient;
    });
    getUsers().filter(user => user.online).forEach(user => {
      const client = currentOnlineClients.find(
        client => client.user.id === user.id,
      );
      if (!client) {
        // Broadcast Unsubscription message
        const offlineUser = user as User;
        setUserOnline(offlineUser.id, false);
        server.sendBroadcastResponse(unsubscriptionMsg(user.name, [offlineUser]));
      }
    });
  }),
);

/**
 * Handle WebSocket Server Connection events
 */
const handleWsServerConnectionEvents = (wsServer: MarbleWebSocketServer) => {
  wsServer.on('connection', (ws: MarbleWebSocketClient, request: HttpRequest) => {
    // Add user to client's properties
    const client = extendClient(request.user)(ws);
    setUserOnline(client.user.id, true);
    client.sendBroadcastResponse(subscriptionMsg(client.user.name));
  });

  handleServerBrokenConnections(wsServer).subscribe();
};

/**
 * Handle Server events
 */
const listening$: HttpServerEffect = (event$, _, { ask }) =>
  event$.pipe(
    matchEvent(ServerEvent.listening),
    map(event => event.payload),
    tap(({ port, host }) => {

      ask(WebSocketServerToken)
        .map(handleWsServerConnectionEvents)
        .getOrElseL(() => {
          throw new Error('WsServerToken not bound to context!');
        });

      console.log(`Server running @ http://${host}:${port}/ 🚀`);
    }),
  );

/**
 * Create a HTTP server
 */
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

// Start the server
server.run();
