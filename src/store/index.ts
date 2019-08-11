import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RootAction, RootState } from 'typesafe-actions';

import { composeEnhancers } from './utils';
import rootReducer from './reducer';
import rootEpic from './epic';
import services from '../services/index';

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>({
  dependencies: services,
});

const middlewares = [epicMiddleware];

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(rootReducer, {}, enhancer);

epicMiddleware.run(rootEpic);

export default store;
