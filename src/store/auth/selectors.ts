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

export const selectLoading = createSelector(
  selectAuth,
  auth => auth.loading,
);

export const selectAuthError = createSelector(
  selectAuth,
  auth => auth.error,
);

export const selectAuthorized = createSelector(
  selectActiveUserId,
  selectToken,
  (activeUserId, token) => Boolean(token && activeUserId),
);
