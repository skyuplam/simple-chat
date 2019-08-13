import { createAction } from 'typesafe-actions';
import {
  ChatMessageEvent, ChatSystemEvent, ChatErrorEvent, User, Message,
} from 'SCModels';


export const sendMessage = createAction(
  '@sc/messages/SEND_MESSAGE',
  action => (msg: string) => action(msg),
);

export const editMessage = createAction(
  '@sc/messages/EDIT_MESSAGE',
  action => (msg: Message) => action(msg),
);

export const sendEditedMessage = createAction(
  '@sc/messages/SEND_EDITED_MESSAGE',
  action => (msg: Message) => action(msg),
);

export const startMessageStream = createAction(
  '@sc/messages/START_MESSAGE_STREAM',
  action => (user: User) => action({ user }),
);

export const stopMessageStream = createAction(
  '@sc/messages/STOP_MESSAGE_STREAM',
  action => (user: User) => action({ user }),
);

export const messageStreamFailure = createAction(
  '@sc/messages/MESSAGE_STREAM_FAILURE',
  action => ({ error }: ChatErrorEvent) => action(error),
);

export const receiveMessage = createAction(
  '@sc/messages/RECEIVE_MESSAGE',
  action => ({ payload }: ChatMessageEvent) => action(payload),
);

export const receiveSystemMessage = createAction(
  '@sc/messages/RECEIVE_SYSTEM_MESSAGE',
  action => ({ payload }: ChatSystemEvent) => action(payload),
);

export const receiveErrorMessage = createAction(
  '@sc/messages/RECEIVE_ERROR_MESSAGE',
  action => ({ error }: ChatErrorEvent) => action(error),
);
