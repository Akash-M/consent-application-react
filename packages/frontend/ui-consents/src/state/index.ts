import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { consentsReducer } from './consents/reducers';
import { ConsentsState } from './consents/types';

export interface ApplicationState {
  consentsReducer: ConsentsState;
}

const store = createStore(
  combineReducers({ consentsReducer }),
  applyMiddleware(thunk),
);

export default store;
