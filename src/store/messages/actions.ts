import { createAsyncAction, createAction } from 'typesafe-actions';
import {
  Message, ChatMessageEvent, ChatSystemEvent, ChatErrorEvent, User,
} from 'SCModels';


export const sendMessage = createAsyncAction(
  '@sc/messages/SEND_MESSAGE_REQUEST',
  '@sc/messages/SEND_MESSAGE_SUCCESS',
  '@sc/messages/SEND_MESSAGE_FAILURE',
  '@sc/messages/SEND_MESSAGE_CANCEL',
)<Message, undefined, undefined, undefined>();

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
