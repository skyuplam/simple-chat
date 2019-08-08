import { combineEpics } from 'redux-observable';
import * as messageEpics from './messages/epics';

export default combineEpics(
  ...Object.values(messageEpics),
);
