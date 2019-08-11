import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { createSession } from './actions';


const initialState = {
  activeUserId: '',
  token: '',
  loading: false,
  error: '',
};

const authReducer = createReducer(initialState)
  .handleAction(
    createSession.request,
    state => produce(state, () => {
      return { ...initialState, loading: true };
    }),
  ).handleAction(
    createSession.success,
    (state, action) => produce(state, draft => {
      const { payload: { payload: { token, user } } } = action;
      draft.token = token;
      draft.activeUserId = user.id;
      draft.loading = false;
    }),
  ).handleAction(
    createSession.failure,
    (state, action) => produce(state, () => {
      const { payload: { error: { error: { message } } } } = action;
      return {
        ...initialState,
        error: message,
      };
    }),
  );

export default authReducer;
