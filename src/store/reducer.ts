import { combineReducers } from 'redux';
import usersReducer from './users/reducer';
import messagesReducer from './messages/reducer';
import authReducer from './auth/reducer';


const rootReducer = combineReducers({
  messages: messagesReducer,
  users: usersReducer,
  auth: authReducer,
});

export default rootReducer;
