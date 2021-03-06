import { RootState } from 'typesafe-actions';
import { createSelector } from 'reselect';
import { orderBy, map, get } from 'lodash';
import cuid from 'cuid';

import { selectUsers } from '../users/selectors';
import { selectActiveUserId } from '../auth/selectors';


export const selectMessages = (state: RootState) => state.messages;

export const selectOrderedMessages = createSelector(
  selectMessages,
  selectUsers,
  selectActiveUserId,
  (msgs, users, activeUserId) => map(
    orderBy(msgs, 'meta.date'),
    msg => ({
      ...msg,
      isBOT: msg.meta.userId === 'user0000',
      isEditable: msg.meta.userId === activeUserId && !msg.meta.deletedAt,
      meta: { ...msg.meta, user: get(users, msg.meta.userId) },
    }),
  ),
);

export const selectMessageToSend = (msg: string) => createSelector(
  selectActiveUserId,
  userId => ({
    id: cuid(),
    content: msg,
    meta: { createdAt: (new Date()).toISOString(), userId },
  }),
);
