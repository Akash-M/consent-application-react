import { v4 as genUuid } from 'uuid';

import { consentListFixtures } from '$/fixtures';

let consents = consentListFixtures;

/**
 * Mock Api call to fetch list of available consents.
 *
 * @return Promise<Consent.Detail[]>
 */
export async function getConsents(): Promise<Consent.Detail[]> {
  return await Promise.resolve(consents);
}

/**
 * Mock Api call to add newly created consent to existing consents.
 *
 * @param consent: New consent to be added.
 * @return Promise<Consent.Detail>
 */
export async function postConsent(
  consent: Consent.NewEntry,
): Promise<Consent.Detail> {
  const newConsentEntry = {
    id: genUuid(),
    ...consent,
  };
  consents = [...consents, newConsentEntry];
  return await Promise.resolve(newConsentEntry);
}
