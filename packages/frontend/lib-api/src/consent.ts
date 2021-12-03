import { v4 as genUuid } from 'uuid';

import { consentListFixtures } from '$/fixtures';

let consents = consentListFixtures;

export async function getConsents(): Promise<Consent.Detail[]> {
  return await Promise.resolve(consents);
}

export async function postConsent(
  consent: Consent.NewEntry,
): Promise<Consent.Detail> {
  const newConsentEntry = {
    consentUuid: genUuid(),
    ...consent,
  };
  consents = [...consents, newConsentEntry];
  return await Promise.resolve(newConsentEntry);
}
