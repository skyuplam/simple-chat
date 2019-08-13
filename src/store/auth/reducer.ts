import { createReducer } from 'typesafe-actions';
import produce from 'immer';
import { createSession, loadCookie, validateSession } from './actions';


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
    [createSession.success, validateSession.success],
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
  ).handleAction(
    loadCookie.success,
    (state, action) => produce(state, draft => {
      draft.token = action.payload;
    }),
  ).handleAction(
    validateSession.failure,
    () => initialState,
  );

export default authReducer;
