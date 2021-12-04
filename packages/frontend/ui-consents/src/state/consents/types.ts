export interface ConsentsState {
  consents: Consent.Detail[];
}

export enum ConsentsActions {
  FETCH_CONSENTS = 'FETCH_CONSENTS',
}
