import { RootState } from 'typesafe-actions';
import { createSelector } from 'reselect';
import { map, size } from 'lodash';


export const selectUsers = (state: RootState) => state.users;

export const selectUserCount = createSelector(
  selectUsers,
  users => size(users) - 1,
);

export const selectOnlineUsers = createSelector(
  selectUsers,
  users => map(users).filter(user => user.online),
);
