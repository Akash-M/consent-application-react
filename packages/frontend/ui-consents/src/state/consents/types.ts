export interface ConsentsState {
  loading: boolean;
  consents: Consent.Detail[];
}

export const CONSENTS_LOADING = 'CONSENTS_LOADING';
export const CONSENTS_SUCCESS = 'CONSENTS_SUCCESS';
export const CONSENTS_ERROR = 'CONSENTS_ERROR';

export interface ConsentsLoading {
  type: typeof CONSENTS_LOADING;
}

export interface ConsentsSuccess {
  type: typeof CONSENTS_SUCCESS;
  payload: Consent.Detail[];
}

export interface ConsentsError {
  type: typeof CONSENTS_ERROR;
}

export type ConsentsDispatchType =
  | ConsentsLoading
  | ConsentsSuccess
  | ConsentsError;
