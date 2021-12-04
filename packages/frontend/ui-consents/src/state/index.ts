import { combineReducers, createStore } from 'redux';

import { consentsReducer } from './consents/reducers';
import { ConsentsState } from './consents/types';

export interface ApplicationState {
  consentsReducer: ConsentsState;
}

const configureStore = () => {
  const store = createStore(combineReducers({ consentsReducer }));
  return { store };
};

export default configureStore;
