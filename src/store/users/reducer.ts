import { createReducer } from 'typesafe-actions';
import { User } from 'SCModels';


type Users = Record<string, User>;
const initialUserState: Users = {};

const usersReducer = createReducer(initialUserState);

export default usersReducer;
