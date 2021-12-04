import { consentsState } from './state';
import { ConsentsActions, ConsentsState } from './types';

export const consentsReducer = (
  state = consentsState,
  action: { type: ConsentsActions },
): ConsentsState => {
  switch (action.type) {
    case ConsentsActions.FETCH_CONSENTS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
