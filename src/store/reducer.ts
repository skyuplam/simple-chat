import { combineReducers } from 'redux';
import usersReducer from './users/reducer';
import messagesReducer from './messages/reducer';


const rootReducer = combineReducers({
  messages: messagesReducer,
  users: usersReducer,
});

export default rootReducer;
