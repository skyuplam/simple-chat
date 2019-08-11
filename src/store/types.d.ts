import { StateType, ActionType } from 'typesafe-actions';
import { Epic } from 'redux-observable';
import * as messagesActions from './messages/actions';
import * as authActions from './auth/actions';
import services from '../services/index';


declare module 'typesafe-actions' {
  export type Services = typeof services;
  export type Store = StateType<typeof import('./index').default>;
  export type RootState = StateType<typeof import('./reducer').default>;
  export type RootAction = ActionType<typeof messagesActions>
  | ActionType<typeof authActions>;

  export type Ep = Epic<RootAction, RootAction, RootState, Services>;

  interface Types {
    RootAction: RootAction;
  }
}
