import { RootState } from 'typesafe-actions';
import { createSelector } from 'reselect';
import { map, size, max } from 'lodash';


export const selectUsers = (state: RootState) => state.users;

export const selectUserCount = createSelector(
  selectUsers,
  users => max([size(users) - 1, 0]) as number, // exclude BOT
);

export const selectOnlineUsers = createSelector(
  selectUsers,
  users => map(users).filter(user => user.online),
);
