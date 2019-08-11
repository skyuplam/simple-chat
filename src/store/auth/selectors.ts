import { RootState } from 'typesafe-actions';
import { createSelector } from 'reselect';

export const selectAuth = (state: RootState) => state.auth;

export const selectActiveUserId = createSelector(
  selectAuth,
  auth => auth.activeUserId,
);

export const selectToken = createSelector(
  selectAuth,
  auth => auth.token,
);

export const selectAuthorized = createSelector(
  selectAuth,
  auth => Boolean(auth.token && auth.activeUserId),
);


