import { createReducer } from 'typesafe-actions';
import { Message } from 'SCModels';


type Messages = Record<string, Message>;
const initialMessagesState: Messages = {};

const messagesReducer = createReducer(initialMessagesState);

export default messagesReducer;
