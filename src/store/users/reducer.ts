import { createReducer } from 'typesafe-actions';
import { reduce } from 'lodash';
import produce from 'immer';
import { User, SystemMessage } from 'SCModels';
import { receiveSystemMessage } from '../messages/actions';


type Users = Record<string, User>;
const initialUserState: Users = {
  user0000: {
    id: 'user0000',
    name: 'Meetingbot',
  }
};

const usersReducer = createReducer(initialUserState)
  .handleAction(
    receiveSystemMessage,
    (state, action) => produce(state, () => {
      const { payload } = action;
      const { meta: { users } } = payload as SystemMessage;
      return reduce(users, (us, u) => ({
        ...us,
        [u.id]: u,
      }), {});
    }),
  );

export default usersReducer;
