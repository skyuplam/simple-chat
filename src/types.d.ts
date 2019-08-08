declare module 'SCModels' {
  export type UserStatus = 'online' | 'offline';
  export interface User {
    id: string;
    name: string;
    status?: UserStatus;
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
  export interface ChatSystemEvent {
    type: 'SYSTEM';
    payload: SystemMessage;
  }
  export interface Error {
    message: string;
    code: string;
  }
  export interface ChatErrorEvent {
    type: 'ERROR';
    error: Error;
  }
  export type ChatEvent = ChatMessageEvent | ChatSystemEvent | ChatErrorEvent;
}
