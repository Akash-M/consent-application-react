// eslint-disable-next-line import/named
import { consentsState } from './state';
import {
  CONSENTS_ERROR,
  CONSENTS_LOADING,
  CONSENTS_SUCCESS,
  ConsentsDispatchType,
  ConsentsState,
} from './types';

export const consentsReducer = (
  state = consentsState,
  action: ConsentsDispatchType,
): ConsentsState => {
  switch (action.type) {
    case CONSENTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CONSENTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case CONSENTS_SUCCESS:
      return {
        loading: false,
        consents: action.payload,
      };
    default:
      return state;
  }
};
