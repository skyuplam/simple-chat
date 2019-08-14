import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { Message, SystemMessage } from 'SCModels';
import { receiveSystemMessage, receiveMessage } from './actions';
import { toBOTMessage } from '../../utils/message';


type Messages = Record<string, Message>;
const initialMessagesState: Messages = {};

const messagesReducer = createReducer(initialMessagesState)
  .handleAction(
    receiveSystemMessage,
    (state, action) => produce(state, draft => {
      const { payload } = action;
      const message = payload as SystemMessage;
      draft[message.id] = toBOTMessage(message);
    }),
  ).handleAction(
    receiveMessage,
    (state, action) => produce(state, draft => {
      const { payload } = action;
      draft[payload.id] = payload;
    }),
  );

export default messagesReducer;
