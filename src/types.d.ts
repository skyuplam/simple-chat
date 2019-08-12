/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'SCModels' {
  export interface User {
    id: string;
    name: string;
    online?: boolean;
  }
  export interface Meta {
    createdAt: string;
  }
  export interface MessageMeta extends Meta {
    editedAt?: string;
    userId: string;
  }
  export interface SystemMessageMeta extends Meta {
    users: User[];
  }
  export interface MessageBase {
    id: string;
    content: string;
  }
  export interface Message extends MessageBase {
    meta: MessageMeta;
  }
  export interface SystemMessage extends MessageBase {
    meta: SystemMessageMeta;
  }
  export interface ChatMessageEvent {
    type: 'MESSAGE';
    payload: Message;
  }
  export interface ChatSystemMessageEvent {
    type: 'SYSTEM';
    payload: SystemMessage;
  }
  export interface ChatSubscriptionEvent {
    type: 'SUBSCRIPTION';
    payload: { token: string; user: User; createdAt: string };
  }
  export interface ChatUnsubscriptionEvent {
    type: 'UNSUBSCRIPTION';
    payload: { token: string; user: User; createdAt: string };
  }
  export type ChatSystemEvent = ChatSystemMessageEvent | ChatSubscriptionEvent
  | ChatUnsubscriptionEvent;
  export interface Error {
    message: string;
    code: string;
  }
  export interface ChatErrorEvent {
    type: 'ERROR';
    error: Error;
  }
  export type ChatEvent = ChatMessageEvent | ChatSystemEvent | ChatErrorEvent;
  export interface Credential {
    name: string;
  }
  export interface FetchResponse {
    meta?: Record<string, any>;
  }
  export interface FetchSuccess extends FetchResponse {
    payload: Record<string, any>;
  }
  export interface FetchFailure extends FetchResponse {
    error: Record<string, any>;
  }
}
