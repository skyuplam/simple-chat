import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { Message, SystemMessage } from 'SCModels';
import { receiveSystemMessage, receiveMessage } from './actions';


type Messages = Record<string, Message>;
const initialMessagesState: Messages = {};

const systemToMessage = (msg: SystemMessage) => {
  const { id, content, meta } = msg;
  return {
    id,
    content,
    meta: {
      createdAt: meta.createdAt,
      userId: 'user0000',
    }
  };
};

const messagesReducer = createReducer(initialMessagesState)
  .handleAction(
    receiveSystemMessage,
    (state, action) => produce(state, draft => {
      const { payload } = action;
      const message = payload as SystemMessage;
      draft[message.id] = systemToMessage(message);
    }),
  ).handleAction(
    receiveMessage,
    (state, action) => produce(state, draft => {
      const { payload } = action;
      draft[payload.id] = payload;
    }),
  );

export default messagesReducer;
