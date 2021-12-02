import { v4 as genUuid } from 'uuid';

import { consentListFixtures } from '$/fixtures';

let consents = consentListFixtures;

export async function getConsents(
  paginator: Consent.Paginator,
): Promise<Consent.Detail[]> {
  const { currentPage, perPage } = paginator;
  const lastTrainingIndex = currentPage * perPage;
  const firstTrainingIndex = lastTrainingIndex - perPage;
  return await Promise.resolve(
    consents.slice(firstTrainingIndex, lastTrainingIndex),
  );
}

export async function getConsentsCount(): Promise<number> {
  return await Promise.resolve(consents.length);
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
