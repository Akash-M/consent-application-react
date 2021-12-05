/* eslint-disable import/named */
import { Dispatch } from 'redux';

import { getConsents } from 'lib-api/src/consent';

import {
  CONSENTS_ERROR,
  CONSENTS_LOADING,
  CONSENTS_SUCCESS,
  ConsentsDispatchType,
} from '$/store/consents/types';

export const fetchConsents = async (
  dispatch: Dispatch<ConsentsDispatchType>,
) => {
  try {
    dispatch({
      type: CONSENTS_LOADING,
    });
    const response = await getConsents();
    dispatch({
      type: CONSENTS_SUCCESS,
      payload: response,
    });
  } catch {
    dispatch({
      type: CONSENTS_ERROR,
    });
  }
};
