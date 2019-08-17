/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A implementation of WebSocket Observable
 */
import {
  Observable, Subscriber, NextObserver, ReplaySubject, Subscription,
} from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { WebSocketCreator } from './webSocket';


export type WebSocketMessage = string | ArrayBuffer | Blob | ArrayBufferView;

export enum WebSocketStatus {
  NORMAL_CLOSURE = 1000,
  GOING_AWAY = 1001,
  PROTOCOL_ERROR = 1002,
  UNSUPPORTED_DATA = 1003,
  NO_STATUS_RECIEVED = 1005,
  ABNORMAL_CLOSURE = 1006,
  INVALID_FRAME_PAYLOAD_DATA = 1007,
  POLICY_VALIDATION = 1008,
  MESSAGE_TOO_BIG = 1009,
  MISSING_EXTENSION = 1010,
  INTERNAL_ERROR = 1011,
  SERVICE_RESTART = 1012,
  TRY_AGAIN_LATER = 1013,
  BAD_GATEWAY = 1014,
  TLS_HANDSHAKE = 1015,
}

export interface WebSocketConfig<T> {
  /**
   * The URL to which to connect; this should be the URL to which the WebSocket
   * server will respond.
   */
  url: string;
  /**
   * Either a single protocol string or an array of protocol strings.
   */
  protocols?: string | string[];
  /**
   * WebSocket creator which can be used as a dependency injection for testing
   * or other version of WebSocket implementations.
   */
  webSocketCreator?: WebSocketCreator;
  /**
   * Deserializer for websocket message, default to JSON.stringify
   */
  deserializer?: (e: MessageEvent) => T;
  /**
   * Serializer for websocket message, default to JSON.parse
   */
  serializer?: (value: T) => WebSocketMessage;
  /**
   * An Observer to watch open event
   */
  openObserver?: NextObserver<Event>;
  /**
   * An Observer to watch a close event
   */
  closeObserver?: NextObserver<CloseEvent>;
  /**
   * An Observer to watch a connection is about to close due to unsubscription
   */
  closingObserver?: NextObserver<void>;
  /**
   * A function to generate a subcription message
   */
  subMsg?: () => T;
  /**
   * A function to generate a unsubcription message
   */
  unsubMsg?: () => T;
}

function webSocket<T>(wsConfig: string | WebSocketConfig<T>) {
  const DEFAULT_CONFIG: WebSocketConfig<T> = {
    url: '',
    deserializer: (e: MessageEvent) => JSON.parse(e.data),
    serializer: (value: T) => JSON.stringify(value),
  };

  const config = typeof wsConfig === 'string' ? {
    ...DEFAULT_CONFIG,
    url: wsConfig,
  } : {
    ...wsConfig,
    serializer: wsConfig.serializer || DEFAULT_CONFIG.serializer,
    deserializer: wsConfig.deserializer || DEFAULT_CONFIG.deserializer,
  };

  const {
    url, protocols, serializer, deserializer, webSocketCreator,
    openObserver, closeObserver, closingObserver,
    subMsg, unsubMsg,
  } = config;

  let socket: WebSocket;

  const queue = new ReplaySubject<T>();

  const isConnected = () => socket && socket.readyState === WebSocket.OPEN;

  const sendMessage = (msg: T) => {
    if (isConnected() && serializer) {
      try {
        socket.send(serializer(msg));
      } catch (e) {
        if (e && e.code) {
          socket.close(e.code, e.reason);
        } else {
          queue.error(e);
        }
      }
    }
  };

  const destination = Subscriber.create<T>(
    (x) => {
      if (x) {
        sendMessage(x);
      }
    },
    (e) => {
      if (closingObserver) {
        closingObserver.next();
      }
      if (e && e.code) {
        socket.close(e.code, e.reason);
      } else {
        queue.error(e);
      }
    },
    () => {
      if (closingObserver) {
        closingObserver.next();
      }
      socket.close(WebSocketStatus.NORMAL_CLOSURE);
    },
  );

  const source = new Observable<T>(observer => {
    try {
      socket = webSocketCreator
        ? new webSocketCreator(url, protocols)
        : new WebSocket(url, protocols);
    } catch (err) {
      observer.error(err);
    }

    let subscription: Subscription;

    socket.onopen = (evt: Event) => {
      if (openObserver) {
        openObserver.next(evt);
      }

      subscription = queue.subscribe({
        next: (x) => { observer.next(x); },
        error: (e) => { observer.error(e); },
      });

      if (subMsg) {
        sendMessage(subMsg());
      }
    };

    socket.onclose = (e: CloseEvent) => {
      if (closeObserver) {
        closeObserver.next(e);
      }

      if (e.wasClean) {
        observer.complete();
        destination.complete();
        queue.complete();
      } else {
        observer.error(e);
      }
    };

    socket.onerror = (e: Event) => {
      observer.error(e);
    };

    socket.onmessage = (e: MessageEvent) => {
      try {
        if (deserializer) {
          observer.next(deserializer(e));
        }
      } catch (err) {
        observer.error(err);
      }
    };

    return () => {
      if (unsubMsg) {
        sendMessage(unsubMsg());
      }

      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close(WebSocketStatus.NORMAL_CLOSURE);
      }
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  });

  return new AnonymousSubject<T>(destination, source);
}

export default webSocket;
