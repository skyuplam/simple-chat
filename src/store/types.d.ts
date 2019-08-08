import { StateType, ActionType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import * as messagesActions from './messages/actions';


declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./index').default>;
  export type RootState = StateType<typeof import('./reducer').default>;
  export type RootAction = ActionType<typeof messagesActions>;

  export type Ep = Epic<RootAction, RootAction, RootState>;

  interface Types {
    RootAction: RootAction;
  }
}
