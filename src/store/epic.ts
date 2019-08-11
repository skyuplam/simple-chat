import { combineEpics } from 'redux-observable';
import * as messageEpics from './messages/epics';
import * as authEpics from './auth/epics';

export default combineEpics(
  ...Object.values(messageEpics),
  ...Object.values(authEpics),
);
