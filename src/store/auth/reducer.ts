import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { createSession } from './actions';


const initialState = {
  activeUserId: '',
  token: '',
};

const authReducer = createReducer(initialState)
  .handleAction(
    createSession.success,
    (state, action) => produce(state, draft => {
      const { payload: { payload: { token } } } = action;
      draft.token = token;
    }),
  ).handleAction(
    createSession.failure,
    () => initialState,
  );

export default authReducer;
